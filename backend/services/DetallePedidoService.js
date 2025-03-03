const DetallePedidoDAO = require('../dao/DetallePedidoDAO');
const DetalleAreaTrabajoService = require('./DetalleAreaTrabajoService');

const DetallePedidoService = {
    async createDetallePedido(idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela,
        accesorios, forro) {
        try {
            if (!idPedido || !idModelo) {
                throw { status: 400, message: "idPedido e idModelo son obligatorios" };
            }
            
            alturaTaco = Number(alturaTaco);

            if (alturaTaco <= 0) {
                throw { status: 400, message: "Cantidad, talla o altura deben ser mayores a 0" };
            }

            if ( !Number.isInteger(alturaTaco)) {
                throw { status: 400, message: "altura de taco deben ser números enteros válidos" };
            }

            const detallePedido = await DetallePedidoDAO.createDetallePedido(
                idPedido, idModelo,codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            if (!detallePedido) {
                throw { status: 500, message: "No se pudo registrar el detalle del pedido" };
            }

            return detallePedido;
        } catch (error) {
            if (error.status) throw error; // Si ya tiene status, lo relanzamos
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message };
        }
    },

    async getDetallePedidoByCodigoPedido(codigoPedido) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const obj =  await DetallePedidoDAO.getDetallePedidoByCodigoPedido(codigoPedido);
            if (!obj) {
                throw { status: 404, message: "Detalle de pedido no encontrado" };
            }
            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message }
        }
    },

    async updateDetallePedido(codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela,
        accesorios, forro) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const obj = await DetallePedidoDAO.updateDetallePedido(codigoPedido, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorios, forro);
            if (!obj) {
                throw { status: 500, message: "No se pudo actualizar el detalle del pedido" };
            }
            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message }
        }
    },

    async updateEstadoDetallePedido(codigoPedido, estado) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const obj = await DetallePedidoDAO.updateEstadoDetallePedido(codigoPedido, estado);
            if(obj && estado ==="Proceso"){
                const {idDetallePedido} = this.getDetallePedidoByCodigoPedido(codigoPedido);
                const detalleAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(idDetallePedido);
                return detalleAreaTrabajo;
            }
            
            if (!obj) {
                throw { status: 500, message: "No se pudo actualizar el estado del detalle del pedido" };
            }
            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message }
        }
    }
};

module.exports = DetallePedidoService;
