const CaracteristicasController = require('../controllers/CaracteristicasController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/crear', authMiddleware, CaracteristicasController.createCaracteristica);
router.get('/todos', authMiddleware, CaracteristicasController.getCaracteristicas);

module.exports = router;