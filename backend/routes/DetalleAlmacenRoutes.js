const DetalleAlmacenController = require('../controllers/DetalleAlmacenController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/crear',authMiddleware, DetalleAlmacenController.createDetalleAlmacen);
router.get('/obtener/:codigoPedido',authMiddleware, DetalleAlmacenController.getDetalleAlmacen);

module.exports = router;