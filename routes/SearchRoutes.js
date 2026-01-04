const SearchController = require('../controllers/SearchController');

const router = require('express').Router();

// Buscar músicas por nome
router.get('/music', SearchController.searchMusicByName)

module.exports = router;