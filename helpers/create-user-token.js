const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = async (user, req, res) => {

    const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({
        meessage: "Autenticado com sucess",
        token
    });
}

module.exports =
    createToken
