const DetalleAlmacenDAO = require('../dao/DetalleAlmacenDAO');

const DetalleAlmacenService = {
    async createDetalleAlmacen(nombreAlmacen, codigoPedido,) {
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        try {
            if(!nombreAlmacen) {
                const errorNombreAlmacen = new Error("nombre de almacen requerido para crear detalle almacen");
                errorNombreAlmacen.status = 400;
                throw errorNombreAlmacen;
            };
            if(!codigoPedido) {
                const errorCodigoPedido = new Error("codigo de pedido requerido para crear detalle almacen");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            };

            const {idAlmacen} = await AlmacenService.getAlmacen(nombreAlmacen);
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const result = await DetalleAlmacenDAO.createDetalleAlmacen(idAlmacen, idDetalle_pedido);
            return result;
        } catch (error) {
            throw error.status ? error : {status: 500, message: "Error en DetalleAlmacenService"};
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
    },

    async updateIdAlmacen(nombreAlmacen, codigoPedido){
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!nombreAlmacen) throw new Error("nombre de almacen requerido para obtener detalle almacen");
            if(!codigoPedido) throw new Error("codigo de pedido requerido para obtener detalle almacen");
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const {idAlmacen} = await AlmacenService.getAlmacen(nombreAlmacen);
            return await DetalleAlmacenDAO.updateIdAlmacen(idAlmacen, idDetalle_pedido);
        } catch(error){
            throw error;
        }
    }
}

module.exports = DetalleAlmacenService