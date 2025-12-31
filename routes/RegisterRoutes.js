const RegisterController = require('../controllers/RegisterController');
const { registerContract } = require('../contracts/RegisterContracts')
const validate = require('../middlewares/validator')

const router = require('express').Router();

 router.post('/createAccount', validate(registerContract), RegisterController.createAccount)

module.exports = router;