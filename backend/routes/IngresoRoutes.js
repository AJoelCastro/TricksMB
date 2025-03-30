const IngresoController = require("../controllers/IngresoController");
const express = require("express");
const router = express.Router();
const outMiddleware = require("../middlewares/authMiddleware");

router.post("/crear", outMiddleware, IngresoController.createIngreso);

module.exports = router;