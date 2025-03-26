const CajaService = require('../services/CajaService');
const errorHandler = require('../utils/errorHandler');

const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            return errorHandler(res, error, error.status);
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
    },
    async updateCaja(req, res) {
        try{
            const { id } = req.params;
            const caja = await CajaService.updateCaja(id);
            res.send({caja, status:200});
        }catch(error){
            console.error("Error en CajaController.updateCaja:", error);
            res.send({message: "Error al actualizar caja", status: error.status });
        }
    },
    async getCajaById(req, res) {
        try{
            const data = req.params;
            const caja = await CajaService.getCajaById(data);
            res.send({caja, status:200});
        }catch(error){
            console.error("Error en CajaController.getCajaById:", error);
            res.send({message: "Error al obtener caja por id", status: error.status });
        }
    }

    
};

module.exports = CajaController;