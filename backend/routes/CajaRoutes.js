const CajaController = require('../controllers/CajaController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/crear/:codigoPedido',authMiddleware, CajaController.createCaja);
//router.get('/obtener/:codigoPedido', CajaController.getAllCajaByPedido);
router.put('/actualizar/:id',authMiddleware, CajaController.updateCaja);
router.get('/obtener/:id',authMiddleware, CajaController.getCajaById);

module.exports = router;