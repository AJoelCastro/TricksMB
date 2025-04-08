const SalidaService = require('../services/SalidaService.js');
const SalidaController = {
    createSalida: async (req, res, next) => {
        try {
            const { idCaja } = req.params;
            const { codigoPedido } = req.body;
            const salida = await SalidaService.createSalida(idCaja, codigoPedido);
            res.json({salida, status: 200});
        } catch (error) {
            next(error);
        }
    },
};

module.exports = SalidaController;