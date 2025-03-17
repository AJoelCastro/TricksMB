const CajaController = require('../controllers/CajaController');
const express = require('express');
const router = express.Router();

router.post("/crear/:codigoPedido", CajaController.createCaja);

module.exports = router;