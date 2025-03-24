const CajaService = require('../services/CajaService');



const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            res.json({ message: "Cajas creadas y PDF enviado por correo.", cajas: result.cajas, status:200 });
        } catch (error) {
            console.error("Error en CajaController.createCaja:", error);
            res.status(error.status || 500).send(error.message);
        }
    },

    async getAllCajaByPedido(req, res) {
        try {
            const { codigoPedido } = req.params;
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const cajas = await CajaService.getAllCajaByPedido(codigoPedido);
            res.status(200).send(cajas);
        } catch (error) {
            console.error("Error en CajaController.getAllCajaByPedido:", error);
            res.status(error.status || 500).send(error.message);
        }
    }
};

module.exports = CajaController;