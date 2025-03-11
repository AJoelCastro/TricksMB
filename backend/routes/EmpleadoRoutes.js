const EmpleadoController = require("../controllers/EmpleadoController");

const express = require('express');
const router = express.Router();

router.post("/crear", EmpleadoController.createEmpleado);
router.get("/buscar/:dni", EmpleadoController.getByDni);
router.get("/buscarPorArea", EmpleadoController.getEmpleados);

module.exports = router;