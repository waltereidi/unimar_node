const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs')
const createToken = require('../helpers/create-user-token')
const jwt = require('jsonwebtoken')

module.exports = class LoginController {

    static async authentication(req, res) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' })
            }

            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                return res.status(401).json({ message: 'Senha inválida!' })
            }

            // Cria e envia o token usando o helper
            return await createToken(user, req, res)

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async isValidToken(req, res) {
            return res.status(200).json({ message: 'Token válido'})
    }
    
}