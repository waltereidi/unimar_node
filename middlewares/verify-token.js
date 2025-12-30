//Verificar se o token é válido!

const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

/**
 * Pegar a req
 * enviar para um func que pegar o token
 * Se for válido usar o next
 * caso contrario, devolve o erro!
 */

const checkToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado! Sem auth' })
    }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Sem Token' })
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        const userExists = await User.findById(verified.id).select('-password')
        req.user = userExists

        next()

    } catch (error) {
        return res.status(400).json({ message: 'O token é inválido!' })
    }
}

module.exports = checkToken;