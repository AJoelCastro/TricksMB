const AreaTrabajoController = require('../controllers/AreaTrabajoController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/crear", authMiddleware, AreaTrabajoController.createAreaTrabajo);
