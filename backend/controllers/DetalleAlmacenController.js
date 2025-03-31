const { getDetalleAlmacen } = require('../dao/DetalleAlmacenDAO');
const DetalleAlmacenService = require('../services/DetalleAlmacenService');

const DetalleAlmacenController = {

    async getDetalleAlmacen(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detalleAlmacen = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateIdAlmacen(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { nombreAlmacen } = req.body;
            const detalleAlmacen = await DetalleAlmacenService.updateIdAlmacen(nombreAlmacen, codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateCantidad(req, res, next) {
        try{
            const { codigoPedido } = req.params;       
            const detalleAlmacen = await DetalleAlmacenService.updateCantidad(codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DetalleAlmacenController