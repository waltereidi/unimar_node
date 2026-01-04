require('dotenv').config()
require('../db/conn')

const Music = require('../models/Music')
const SearchController = require('../controllers/SearchController')

async function run() {
  try {
    const uniqueName = `test-music-${Date.now()}`
    const music = new Music({
      name: uniqueName,
      slug: uniqueName.replace(/\s+/g, '-').toLowerCase(),
      description: 'Música de teste',
      duration: 123,
      audioUrl: '',
      coverImage: '',
      artists: ['Tester'],
      category: 'Test',
      published: true
    })

    await music.save()
    console.log('Música de teste criada:', music._id)

    const req = { query: { name: 'test-music' }, body: {} }

    const res = {
      statusCode: 200,
      data: null,
      status(code) { this.statusCode = code; return this },
      json(obj) { this.data = obj; console.log('Resposta JSON:', JSON.stringify(obj, null, 2)); return obj }
    }

    await SearchController.searchMusicByName(req, res)

    // verificar se a música criada aparece nos resultados
    const found = (res.data && res.data.musics || []).some(m => m._id.toString() === music._id.toString())
    console.log('Música encontrada nos resultados?', found)

    // cleanup
    await Music.deleteOne({ _id: music._id })
    console.log('Música de teste removida')

    // fechar conexão e sair
    const mongoose = require('mongoose')
    await mongoose.connection.close()
    process.exit(found ? 0 : 2)
  } catch (err) {
    console.error('Erro no teste:', err)
    try { const mongoose = require('mongoose'); await mongoose.connection.close() } catch(e){}
    process.exit(1)
  }
}

run()
