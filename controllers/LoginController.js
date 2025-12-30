const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs')
const createToken = require('../helpers/create-user-token')
const jwt = require('jsonwebtoken')

module.exports = class LoginController {

    static async authentication(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ message: 'Email e senha são obrigatórios!' })
        }

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

    static async requireToken(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Acesso negado! Sem auth' })
        }

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado! Sem Token' })
        }

        try {
            const verified = jwt.verify(token, process.env.SECRET)
            const userExists = await User.findById(verified.id).select('-password')

            if (!userExists) {
                return res.status(401).json({ message: 'Usuário não encontrado a partir do token' })
            }

            return res.status(200).json({ message: 'Token válido', user: userExists })

        } catch (error) {
            return res.status(400).json({ message: 'O token é inválido!' })
        }
    }
    

    // static async getAll(req, res) {
    //     const pets = await Pet.find().sort('-createdAt')
    //     res.status(200).json({ pets })
    // }

    // static async getPetById(req, res) {
    //     const id = req.params.id

    //     if (!ObjectId.isValid(id)) {
    //         return res.status(422).json({ message: 'ID inválido' })

    //     }

    //     const pet = await Pet.findById(id)
    //     if (!pet) {
    //         res.status(404).json({ message: 'Pet não encontrado' })
    //         return
    //     }
    //     res.status(200).json({ pet })
    // }

    // static async createPet(req, res) {

    //     const userLogged = req.user;
    //     const pet = new Pet(req.body)
    //     pet.user = userLogged
    //     //trycatch
    //     try {
    //         await pet.save()
    //     } catch (error) {
    //         res.status(500).json({ message: error.message })
    //     }

    //     res.status(201).json({ message: 'Pet cadastrado com sucesso!' })
    // }

    // static async deletePet(req, res) {
    //     const id = req.params.id

    //     if (!ObjectId.isValid(id)) {
    //         return res.status(422).json({ message: 'ID inválido' })
    //     }
    //     const pet = await Pet.findByIdAndDelete(id)
    //     if (!pet) {
    //         res.status(404).json({ message: 'Pet não encontrado' })
    //         return
    //     }
    //     res.status(200).json({ message: 'Pet removido com sucesso!' })
    // }

    // static async updatePet(req, res) {
    //     const id = req.params.id

    //     if (!ObjectId.isValid(id)) {
    //         return res.status(422).json({ message: 'ID inválido' })
    //     }
    //     try {
    //         const pet = await Pet.findByIdAndUpdate(id, req.body)
    //         if (!pet) {
    //             return res.status(404).json({ message: 'Pet não encontrado' })

    //         }
    //         return res.status(200).json({ message: 'Pet atualizado com sucesso!' })
    //     } catch (error) {

    //     }

    // }
}