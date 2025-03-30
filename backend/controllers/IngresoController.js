const IngresoService = require("../services/IngresoService");

const IngresoController = {
    async createIngreso(req, res, next) {
        try {
            const { idCaja, codigoPedido } = req.body;
            const ingreso = await IngresoService.createIngreso(idCaja, codigoPedido);
            res.json({ ingreso, status: 201 });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = IngresoController