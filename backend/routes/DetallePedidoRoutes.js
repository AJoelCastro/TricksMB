const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const DetallePedidoController = require('../controllers/DetallePedidoController');

const router = express.Router();


router.post('/crear', authMiddleware,DetallePedidoController.createPedido);
router.get('/obtener/:codigoPedido', authMiddleware, DetallePedidoController.getDetallePedidoByCodigoPedido);
router.get('/todos',authMiddleware, DetallePedidoController.getAllDetallePedido);
router.put('/actualizar/:codigoPedido', authMiddleware, DetallePedidoController.updateDetallePedido);
router.put('/actualizarEstado/:codigoPedido', authMiddleware, DetallePedidoController.updateEstado);

module.exports = router;
