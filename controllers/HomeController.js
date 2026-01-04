const User = require('../models/User')

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class UserController {

    static async getAll(req, res) {
        const users = await User.find().sort('-createdAt')
        res.status(200).json({ users })
    }

}