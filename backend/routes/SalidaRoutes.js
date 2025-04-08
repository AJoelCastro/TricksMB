const SalidaController = require('../controllers/SalidaController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/crear/:idCaja', SalidaController.createSalida);

module.exports = router;