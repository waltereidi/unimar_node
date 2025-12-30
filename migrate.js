/* Migration runner

Usage:
  node migrate.js up    # run pending migrations
  node migrate.js down  # run last migration down (not implemented)

Migrations live in ./migrations and must export { id, up, down? }
This runner stores applied migrations in `migrations` collection.
*/

const path = require('path')
const fs = require('fs')
const mongoose = require('./db/conn')
require('dotenv').config()

const MIGRATIONS_DIR = path.join(__dirname, 'migrations')

async function getAppliedMigrations() {
  const Migration = mongoose.model('Migration', new mongoose.Schema({
    id: String,
    appliedAt: Date,
  }, { collection: 'migrations' }))

  return Migration.find().sort('appliedAt').lean()
}

async function markApplied(id) {
  const Migration = mongoose.model('Migration')
  await Migration.create({ id, appliedAt: new Date() })
}

async function run() {
  try {
    const files = fs.existsSync(MIGRATIONS_DIR) ? fs.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.js')).sort() : []
    const applied = await getAppliedMigrations()
    const appliedIds = new Set(applied.map(a => a.id))

    const pending = []
    for (const file of files) {
      const mig = require(path.join(MIGRATIONS_DIR, file))
      const id = mig.id || file
      if (!appliedIds.has(id)) pending.push({ id, file, mig })
    }

    if (!pending.length) {
      console.log('No pending migrations')
      process.exit(0)
    }

    for (const p of pending) {
      console.log('Running migration:', p.file)
      if (typeof p.mig.up !== 'function') {
        console.warn('Migration has no up() function, skipping:', p.file)
        continue
      }
      await p.mig.up(mongoose)
      await markApplied(p.id)
      console.log('Applied:', p.file)
    }

    console.log('Migrations complete')
    process.exit(0)
  } catch (err) {
    console.error('Migration error:', err)
    process.exit(1)
  }
}

const cmd = process.argv[2] || 'up'
if (cmd === 'up') run()
else console.error('Only `up` is supported by this simple runner')
