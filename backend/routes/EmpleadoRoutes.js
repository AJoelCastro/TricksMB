const EmpleadoController = require("../controllers/EmpleadoController");

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/crear", authMiddleware, EmpleadoController.createEmpleado);