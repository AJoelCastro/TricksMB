const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const AreaTrabajoController = require('../controllers/DetalleAreaTrabajoController');

router.get('/todos', authMiddleware, AreaTrabajoController.getDetalleAreaTrabajo);
router.put('/actualizar', authMiddleware, AreaTrabajoController.updateDetalleAreaTrabajo);

module.exports = router;