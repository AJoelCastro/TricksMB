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
    },
    async getIngresosByCaja(req, res, next) {
        try {
            const { idCaja } = req.params;
            const ingreso = await IngresoService.getIngresosByCaja(idCaja);
            if(ingreso !== null ){
                const erroridCaja = new Error(`La caja ${ingreso.Caja_idCaja} ya ha sido ingresada al almacén anteriormente`);
                erroridCaja.status = 404;
                throw erroridCaja;
            }
            res.json({ ingreso, status: 201 });
        } catch (error) {
            next(error);
        }
    },

}

module.exports = IngresoController