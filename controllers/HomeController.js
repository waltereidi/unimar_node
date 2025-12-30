const User = require('../models/User')

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class UserController {

    static async getAll(req, res) {
        const users = await User.find().sort('-createdAt')
        res.status(200).json({ users })
    }

    // static async createUser(req, res) {

    //     // if (!req.body) {
    //     //     return res.status(422).json({ message: 'PRecisa enviar as informacoes' })
    //     // }
    //     // const { name, slug } = req.body

    //     // if (!name) {
    //     //     return res.status(422).json({ message: 'O nome é obrigatório!' })
    //     // }
    //     // if (!slug) {
    //     //     return res.status(422).json({ message: 'O slug é obrigatório!' })
    //     // }
    //     // const categoryExists = await Category.findOne({ slug })
    //     // if (categoryExists) {
    //     //     return res.status(422).json({ message: 'Slug já está em uso!' })
    //     // }

    //     // const category = new Category({
    //     //     name,
    //     //     slug,
    //     // })
    //     // try {
    //     //     await category.save()
    //     //     res.status(201).json({ message: 'Categoria criada com sucesso!' })
    //     // } catch (error) {
    //     //     res.status(500).json({ message: error })
    //     // }
    // }
}