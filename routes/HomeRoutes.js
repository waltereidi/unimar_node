/*
Listar os pets
Criar um pet
ver um pet byID
atualizar um pet - id
deletar um pet - id
*/ 

const router = require('express').Router();

const HomeController = require('../controllers/HomeController');
// router.get('/all-pets',checkToken, HomeController.getAll)
// router.post('/create', checkToken, HomeController.createPet)
// router.get('/:id', checkToken, HomeController.getPetById)
// router.delete('/:id', checkToken, HomeController.deletePet)
// router.patch('/:id',checkToken, HomeController.updatePet)

module.exports = router;