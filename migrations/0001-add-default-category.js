// Example migration: create a default category if none exists

module.exports = {
  id: '0001-add-default-category',
  async up(mongoose) {
    const Category = mongoose.model('Category') || require('../models/Category')
    const existing = await Category.findOne({ name: 'Uncategorized' })
    if (!existing) {
      await Category.create({ name: 'Uncategorized', slug: 'uncategorized', description: 'Categoria padrão' })
      console.log('Default category created')
    } else {
      console.log('Default category already exists')
    }
  }
}
