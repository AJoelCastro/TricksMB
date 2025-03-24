const { json } = require('body-parser');
const TipoCalzadoService = require('../services/TipoCalzadoService');

const TipoCalzadoController = {


    async createTipoModelo(req, res) {
        try {
            const { nombre } = req.body;
            const tipoCalzado = await TipoCalzadoService.createTipoModelo(nombre);
            res.json({ tipoCalzado, status: 201 });
        } catch (error) {
            console.error("Error al crear tipo de calzado:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });   
        }
    },

    async getAllTipoCalzado(req, res) {
        try {
            const tipoCalzado = await TipoCalzadoService.getAllTipoCalzado();
            res.json({ tipoCalzado, status: 200 });
        } catch (error) {
            console.error("Error al obtener tipo de calzado:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getTipoCalzadoByNombre(req,res){
        try{
            const nombre = req.query.nombre;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByNombre(nombre);
            res.json({tipoCalzado, status: 200});
        }catch(error){
            console.error("Error al obtner el tipo de calzado por nombre: ", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getTipoCalzadoByCodigoPedido(req,res){
        try{
            const {codigoPedido} = req.params;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
            res.json({tipoCalzado, status: 200});
        }catch(error){
            console.error("Error al obtener el tipo de calzado por código de pedido: ", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    }
};

module.exports = TipoCalzadoController;