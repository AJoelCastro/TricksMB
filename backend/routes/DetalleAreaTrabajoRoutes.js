const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const AreaTrabajoController = require('../controllers/DetalleAreaTrabajoController');

router.get('/todos/:codigoPedido', authMiddleware, AreaTrabajoController.getDetalleAreaTrabajo);
router.put('/actualizar/:idCaracteristicas', authMiddleware, AreaTrabajoController.updateDetalleAreaTrabajo);

module.exports = router;