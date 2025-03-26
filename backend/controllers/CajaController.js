const CajaService = require('../services/CajaService');

const CajaController = {
    async createCaja(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            res.json({ message: result.message, status: 201 });
        } catch (error) {
            next(error); 
        }
    },

    async getAllCajaByPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const cajas = await CajaService.getAllCajaByPedido(codigoPedido);
            res.json({ cajas, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateCaja(req, res, next) {
        try {
            const { id } = req.params;
            const caja = await CajaService.updateCaja(id);
            res.json({ caja, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getCajaById(req, res, next) {
        try {
            const { id } = req.params;
            const caja = await CajaService.getCajaById(id);
            res.json({ caja, status: 200 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = CajaController;
