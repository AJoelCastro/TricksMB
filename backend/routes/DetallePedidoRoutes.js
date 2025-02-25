const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const PedidoController = require('../controllers/DetallePedidoController');

const router = express.Router();


router.post('/crear', authMiddleware,PedidoController.createPedido);
router.get('/obtener/:codigoPedido', authMiddleware, PedidoController.getDetallePedidoByCodigoPedido);
router.put('/actualizar/:codigoPedido', authMiddleware, PedidoController.updateDetallePedido);

module.exports = router;
