const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');

router.post('/', authMiddleware, ClienteController.registrarCliente);
router.post('/natural', authMiddleware, ClienteController.registrarCliente);
router.post('/juridico', authMiddleware, ClienteController.registrarCliente);
router.get('/', authMiddleware, ClienteController.obtenerClientes);
router.get('/buscar/natural', authMiddleware, ClienteController.buscarClienteNatural);
router.get('/buscar/juridico', authMiddleware, ClienteController.buscarClienteJuridico);
router.get('/clientes', authMiddleware, ClienteController.obtenerClientes);
router.get('/cliente/:codigoPeido', authMiddleware, ClienteController.getClienteByCodigoPedido);
module.exports = router;
