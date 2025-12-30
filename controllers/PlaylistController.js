// const User = require('../models/User')
const bcrypt = require('bcryptjs')

const userToken = require('../helpers/create-user-token')

module.exports = class PlaylistController {

    // static async register(req, res) {
    //     const user = new User(req.body)
    //     if (!user.name) {
    //         return res.status(422).json({ message: 'O nome é obrigatório!' })

    //     }
    //     if (!user.email) {
    //         return res.status(422).json({ message: 'O email é obrigatório!' })

    //     }
    //     if (!user.password) {
    //         return res.status(422).json({ message: 'A senha é obrigatória!' })

    //     }
    //     const userExists = await User.findOne({ email: user.email })

    //     if (userExists) {
    //         return res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
    //     }

    //     const passHashed = await bcrypt.hash(user.password, 10)
    //     try {
    //         user.password = passHashed
    //         await user.save()
    //     } catch (error) {
    //         return res.status(500).json({ message: error })
    //     }

    //     res.status(200).json({ message: 'criado com sucesso!' })

    // }
    // static async login(req, res) {
    //     //email e senha
    //     const { email, password } = req.body

    //     const userLogin = await User.findOne({ email: email })

    //     if (!userLogin) {
    //         res.status(422).json({ message: 'Usuário não encontrado com este email!' })
    //     }

    //     const checkPassword = await bcrypt.compare(password, userLogin.password)

    //     if (!checkPassword) {
    //         res.status(401).json({ message: 'Senha ou email inválidos!!' })
    //     }
    //     //Logar o usuario JWT
    //     await userToken(userLogin, req, res)
    // }
}