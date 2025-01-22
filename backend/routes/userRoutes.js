const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para crear un usuario
router.post('/', createUser);

module.exports = router;
