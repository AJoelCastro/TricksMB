const { updatePedido } = require('../dao/PedidoDAO');
const PedidoService = require('../services/PedidoService');

const PedidoController = {

    async getPedidoByCodigoPedido(req, res) {
        try {
            const codigoPedido = req.query.codigoPedido;
            const pedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
            return res.status(200).json(pedido);
        } catch (error) {
            console.error("Error al obtener pedido por código de pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async updatePedido(req, res) {
        try {
            const { codigoPedido, fechaEntrega, serieInicio, serieFinal } = req.body;
            const pedido = await PedidoService.updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal);
            return res.status(200).json(pedido);
        } catch (error) {
            console.error("Error al actualizar pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = PedidoController;