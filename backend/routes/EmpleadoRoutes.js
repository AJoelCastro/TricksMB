const EmpleadoController = require("../controllers/EmpleadoController");
const DetalleEmpleadoPedidoController = require("../controllers/DetalleEmpleadoPedidoController");

const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/crear", EmpleadoController.createEmpleado);
router.get("/buscar/:dni", EmpleadoController.getByDni);
router.get("/buscarPorArea", EmpleadoController.getEmpleados);
router.post("/crearDetalleEmpleadoPedido",authMiddleware, DetalleEmpleadoPedidoController.createDetalleEmpleadoPedido);

module.exports = router;