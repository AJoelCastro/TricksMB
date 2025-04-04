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
            throw error.status ? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }
    },

    async getDetalleAlmacen(codigoPedido){
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!codigoPedido) {
                const error = new Error("codigo de pedido requerido para obtener detalle almacen");
                error.status = 400;
                throw error;
            }
            const data = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            return await DetalleAlmacenDAO.getDetalleAlmacen(data.idDetalle_pedido);
        }catch(error){
            throw error.status? error: {status: 500, message: "Error en DetalleAlmacenService"};
        }
    },

    async getAllDetalleAlmacen(){
        try{
            return await DetalleAlmacenDAO.getAllDetalleAlmacen();
        }catch(error){
            throw error.status? error: {status: 500, message: "Error en DetalleAlmacenService"};
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
    }, 

    async updateCantidadIngreso(codigoPedido, cantidad){
        const DetallePedidoService = require('./DetallePedidoService');
        const AlmacenService = require('./AlmacenService');
        try{
            if(!codigoPedido){
                const errorCodigoPedido = new Error("codigo de pedido requerido para obtener detalle almacen");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            };
            if(!cantidad){ 
                const errorCantidad = new Error("cantidad requerida para actualizar cantidad ingreso");
                errorCantidad.status = 400;
                throw errorCantidad;
            };
            const detalleAlmacen = await this.getDetalleAlmacen(codigoPedido);
            const {Cantidad} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);

            const cantidadIngreso = detalleAlmacen.Cantidad_ingreso + cantidad;

            if(cantidadIngreso === Cantidad) {
                await DetalleAlmacenDAO.updateEstado(detalleAlmacen.idDetalle_almacen, "Terminado");
            }

            if(cantidadIngreso>Cantidad){
                throw new Error("Ingresos mayor a la cantidad total del pedido");
            }

            await AlmacenService.updateStock(detalleAlmacen.Almacen_idAlmacen, cantidadIngreso);

            return await DetalleAlmacenDAO.updateCantidadIngreso(detalleAlmacen.idDetalle_almacen, cantidadIngreso);
        } catch(error){
            throw error.status ? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }
    }


}

module.exports = DetalleAlmacenService