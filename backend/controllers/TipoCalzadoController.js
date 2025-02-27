const TipoCalzadoService = require('../services/TipoCalzadoService');

const TipoCalzadoController = {

    async getAllTipoCalzado(req, res) {
        try {
            const tipoCalzado = await TipoCalzadoService.getAllTipoCalzado();
            return res.status(200).json(tipoCalzado);
        } catch (error) {
            console.error("Error al obtener tipo de calzado:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getTipoCalzadoByNombre(req,res){
        try{
            const nombre = req.query.nombre;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByNombre(nombre);
            return res.status(200).json(tipoCalzado);
        }catch(error){
            console.error("Error al obtner el tipo de calzado por nombre: ", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getTipoCalzadoByCodigoPedido(req,res){
        try{
            const {codigoPedido} = req.params;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
            return res.status(200).json(tipoCalzado);
        }catch(error){
            console.error("Error al obtener el tipo de calzado por código de pedido: ", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = TipoCalzadoController;