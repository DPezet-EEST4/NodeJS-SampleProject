const express = require('express');
const router = express.Router();

// Controlador de usuarios
const usersController = require('../controllers/usuario.controller.js');

// Rutas de usuarios
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/register', usersController.create);

module.exports = router;