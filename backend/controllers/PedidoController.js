const PedidoService = require('../services/PedidoService');

const PedidoController = {
    async createPedido(req, res) {
        const { idCliente, FechaEntrega, SerieInicio, SerieFinal } = req.body;
        try {
            const pedido = await PedidoService.createPedido(idCliente, FechaEntrega, SerieInicio, SerieFinal);
            res.status(201).json(pedido);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};