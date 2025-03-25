const { json } = require('body-parser');
const ModeloService = require('../services/ModeloService');

const ModeloController = {

    async createModelo(req, res) {
        try {
            const { idTipo, nombre } = req.body;
            const modelo = await ModeloService.createModelo(idTipo, nombre);
            res,json({modelo, status: 201});
        } catch (error) {
            console.error("Error al crear modelo:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getAllModelo(req, res) {
        try {
            const modelos = await ModeloService.getAllModelo();
            res.json({ modelos, status: 200 });
        } catch (error) {
            console.error("Error al obtener modelos:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getAllModeloById(req, res) {
        try {
            const id = req.query.id;
            
            const modelo = await ModeloService.getAllModeloById(id);
            res.json({ modelo, status: 200 });
        } catch (error) {
            console.error("Error al obtener modelo por id:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getModeloByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const modelo = await ModeloService.getModeloByCodigoPedido(codigoPedido);
            res.json({modelo, status: 200});
        } catch (error) {
            console.error("Error al obtener modelo por código de pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    }
};

module.exports = ModeloController;