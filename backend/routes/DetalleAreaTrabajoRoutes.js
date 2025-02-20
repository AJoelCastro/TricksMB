const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const AreaTrabajoController = require('../controllers/AreaTrabajoController');

router.post('/crear', authMiddleware, AreaTrabajoController.createAreaTrabajo);

module.exports = router;