const CajaService = require('../services/CajaService');

const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            res.json({ message: "Cajas creadas y PDF enviado por correo.", cajas: result.cajas, status:200 });
        } catch (error) {
            console.error("Error en CajaController.createCaja:", error);
            res.send({message: "Error al crear cajas", status: error.status });
        }
    },

    async getAllCajaByPedido(req, res) {
        try {
            const { codigoPedido } = req.params;
            const cajas = await CajaService.getAllCajaByPedido(codigoPedido);
            res.send({cajas, status:200});
        } catch (error) {
            console.error("Error en CajaController.getAllCajaByPedido:", error);
            res.send({message: "Error al obtener cajas por pedido", status: error.status });
        }
    }
};

module.exports = CajaController;