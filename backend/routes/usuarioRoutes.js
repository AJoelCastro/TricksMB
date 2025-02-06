const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Ruta para registrar un usuario
router.post('/register', UsuarioController.register);

// Ruta para iniciar sesión
router.post('/login', UsuarioController.login);

module.exports = router;
