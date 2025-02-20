const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const AreaTrabajoController = require('../controllers/DetalleAreaTrabajoController');

router.post('/crear', authMiddleware, AreaTrabajoController.createDetalleAreaTrabajo);

module.exports = router;