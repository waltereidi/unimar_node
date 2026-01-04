const ApiAdminController = require('../controllers/ApiAdminController');
const verifyToken = require('../middlewares/verify-token')
const router = require('express').Router();
const { createMusicContract } = require('../contracts/ApiAdminContract')

const validate = require('../middlewares/validator')

/** Criar nova música */
router.post('/createMusic', verifyToken, validate(createMusicContract), ApiAdminController.createMusic)

/** Listar todas as músicas com paginação */
router.get('/getMusics', verifyToken, ApiAdminController.getMusics)

module.exports = router;