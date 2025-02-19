const TipoCalzado = require('../service/TipoCalzadoService');

const TipoCalzadoController = {

    async getAllTipoCalzado(req, res) {
        try {
            const tipoCalzado = await TipoCalzado.getAllTipoCalzado();
            return res.status(200).json(tipoCalzado);
        } catch (error) {
            console.error("Error al obtener tipo de calzado:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
}

module.exports = TipoCalzadoController;