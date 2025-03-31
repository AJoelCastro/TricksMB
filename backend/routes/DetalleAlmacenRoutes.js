const DetalleAlmacenController = require('../controllers/DetalleAlmacenController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/obtener/:codigoPedido',authMiddleware, DetalleAlmacenController.getDetalleAlmacen);
router.put('/actualizar/:codigoPedido',authMiddleware, DetalleAlmacenController.updateIdAlmacen);
router.put('/actualizarCantidad/:codigoPedido',authMiddleware, DetalleAlmacenController.updateCantidad);

module.exports = router;