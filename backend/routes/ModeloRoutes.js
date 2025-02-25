const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ModeloController = require('../controllers/ModeloController');

router.get('/todos', authMiddleware, ModeloController.getAllModelo);
router.get('/id', authMiddleware,  ModeloController.getAllModeloById);
router.get('/obtener/:codigoPedido', authMiddleware, ModeloController.getModeloByCodigoPedido);
module.exports = router;