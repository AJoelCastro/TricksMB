const DetalleAlmacenDAO = require('../dao/DetalleAlmacenDAO');

const DetalleAlmacenService = {
    async createDetalleAlmacen(nombreAlmacen, codigoPedido,) {
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        try {
            if(!nombreAlmacen) throw new Error("nombre de almacen requerido para crear detalle almacen");
            if(!codigoPedido) throw new Error("codigo de pedido requerido para crear detalle almacen");

            const {idAlmacen} = await AlmacenService.getAlmacenByNombre(nombreAlmacen);
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const result = await DetalleAlmacenDAO.createDetalleAlmacen(idAlmacen, idDetalle_pedido);
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getDetalleAlmacen(codigoPedido){
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!codigoPedido) throw new Error("codigo de pedido requerido para obtener detalle almacen");
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            return await DetalleAlmacenDAO.getDetalleAlmacen(idDetalle_pedido);
        }catch(error){
            throw error;
        }
    }
}

module.exports = DetalleAlmacenService