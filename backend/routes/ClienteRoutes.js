const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');

router.post('/', authMiddleware, ClienteController.registrarCliente);
router.post('/natural', authMiddleware, ClienteController.registrarCliente);
router.post('/juridico', authMiddleware, ClienteController.registrarCliente);
router.get('/', authMiddleware, ClienteController.obtenerClientes);
router.post('/buscar', authMiddleware, ClienteController.buscarCliente);
module.exports = router;
