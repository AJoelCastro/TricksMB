const { getAllModelo } = require('../dao/ModeloDAO');
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
    }
};