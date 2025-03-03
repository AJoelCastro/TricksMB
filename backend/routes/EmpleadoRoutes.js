const EmpleadoController = require("../controllers/EmpleadoController");

const express = require('express');
const router = express.Router();

router.post("/crear", EmpleadoController.createEmpleado);

module.exports = router;