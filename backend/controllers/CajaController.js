const CajaService = require('../services/CajaService');

const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const result = await CajaService.createCaja(codigoPedido);
            res.status(result.status).send(result.message);
        } catch (error) {
            console.error("Error en CajaController.createCaja:", error);
            res.status(error.status || 500).send(error.message);
        }
    }

}

module.exports = CajaController;