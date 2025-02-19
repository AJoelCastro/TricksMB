const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ModeloController = require('../controllers/ModeloController');

router.get('/todos', authMiddleware, ModeloController.getAllModelo);

module.exports = router;