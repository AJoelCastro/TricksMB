const { getDetalleAlmacen } = require('../dao/DetalleAlmacenDAO');
const DetalleAlmacenService = require('../services/DetalleAlmacenService');

const DetalleAlmacenController = {
    async createDetalleAlmacen(req, res, next) {
        try {
            const { nombreAlmacen, codigoPedido } = req.body;
            const detalleAlmacen = await DetalleAlmacenService.createDetalleAlmacen(nombreAlmacen, codigoPedido);
            res.json({ detalleAlmacen, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getDetalleAlmacen(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detalleAlmacen = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DetalleAlmacenController