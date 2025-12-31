const User = require('../models/User')

const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs')
module.exports = class RegisterController {

    static async createAccount(req, res) {
        const { name, email, password, image, phone } = req.body

        try {
            const userExists = await User.findOne({ email })
            if (userExists) {
                return res.status(422).json({ message: 'Email já está em uso!' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const novoUsuario = new User({
                name,
                email,
                password: hashedPassword,
                image: image || '',
                phone: phone || ''
            })

            await novoUsuario.save()
            return res.status(201).json({ message: 'Usuário inserido com sucesso!' })
        } catch (err) {
            console.error('Erro ao inserir usuário:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }
   
}