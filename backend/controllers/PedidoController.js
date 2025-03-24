const { updatePedido } = require('../dao/PedidoDAO');
const PedidoService = require('../services/PedidoService');

const PedidoController = {

    async getPedidoByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const pedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
            res.status(200).json(pedido);
        } catch (error) {
            console.error("Error al obtener pedido por código de pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async updatePedido(req, res) {
        try {
            const { codigoPedido, fechaEntrega, serieInicio, serieFinal } = req.body;
            const pedido = await PedidoService.updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal);
            res.status(200).json(pedido);
        } catch (error) {
            console.error("Error al actualizar pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    }
};

module.exports = PedidoController;