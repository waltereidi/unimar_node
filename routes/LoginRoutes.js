const LoginController = require('../controllers/LoginController');

const router = require('express').Router();

router.post('/authentication', LoginController.authentication)


module.exports = router;