const ModeloService = require('../services/ModeloService');

const ModeloController = {

    async getAllModelo(req, res) {
        try {
            const modelos = await ModeloService.getAllModelo();
            return res.status(200).json(modelos);
        } catch (error) {
            console.error("Error al obtener modelos:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getAllModeloById(req, res) {
        try {
            const id = req.query.id;
            const modelo = await ModeloService.getAllModeloById(id);
            return res.status(200).json(modelo);
        } catch (error) {
            console.error("Error al obtener modelo por id:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getModeloByCodigoPedido(req, res) {
        try {
            const codigoPedido = req.query.codigoPedido;
            const modelo = await ModeloService.getModeloByCodigoPedido(codigoPedido);
            return res.status(200).json(modelo);
        } catch (error) {
            console.error("Error al obtener modelo por código de pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = ModeloController;