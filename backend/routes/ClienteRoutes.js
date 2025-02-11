const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');

// 🔹 Crear un cliente base
router.post('/', authMiddleware, ClienteController.createCliente);

// 🔹 Crear cliente natural
router.post('/natural', authMiddleware, ClienteController.createClienteNatural);

// 🔹 Crear cliente jurídico
router.post('/juridico', authMiddleware, ClienteController.createClienteJuridico);

// 🔹 Obtener cliente natural por DNI
router.get('/natural/:dni', authMiddleware, ClienteController.getClienteNaturalByDni);

// 🔹 Obtener cliente jurídico por RUC
router.get('/juridico/:ruc', authMiddleware, ClienteController.getClienteJuridicoByRuc);

// 🔹 Obtener todos los clientes
router.get('/', authMiddleware, ClienteController.getAllClientes);

module.exports = router;
