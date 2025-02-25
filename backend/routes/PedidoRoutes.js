const PedidoController = require('../controllers/PedidoController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/obtener', authMiddleware, PedidoController.getDetallePedidoByCodigoPedido);
router.put('/actualizar/:codigoPedido', authMiddleware, PedidoController.updateDetallePedido);

module.exports = router;
