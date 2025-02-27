const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const DetallePedidoController = require('../controllers/DetallePedidoController');

const router = express.Router();


router.post('/crear', authMiddleware,DetallePedidoController.createPedido);
router.get('/obtener/:codigoPedido', authMiddleware, DetallePedidoController.getDetallePedidoByCodigoPedido);
router.put('/actualizar/:codigoPedido', authMiddleware, DetallePedidoController.updateDetallePedido);

module.exports = router;
