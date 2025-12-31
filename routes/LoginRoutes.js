const LoginController = require('../controllers/LoginController');
const verifyToken = require('../middlewares/verify-token')
const router = require('express').Router();
const { authenticationContract } = require('../contracts/LoginContracts')
const validate = require('../middlewares/validator')

/** Routes */
router.post('/authentication', validate(authenticationContract), LoginController.authentication)
router.post('/isValidToken', verifyToken ,LoginController.isValidToken)

module.exports = router;