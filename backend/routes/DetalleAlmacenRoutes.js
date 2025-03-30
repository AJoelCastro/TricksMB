const DetalleAlmacenController = require('../controllers/DetalleAlmacenController');

const express = require('express');
const router = express.Router();
const outMiddleware = require('../middlewares/authMiddleware');

router.post('/crear',outMiddleware, DetalleAlmacenController.createDetalleAlmacen);
router.get('/obtener/:codigoPedido',outMiddleware, DetalleAlmacenController.getDetalleAlmacen);

module.exports = router;