const DetalleAreaTrabajoDAO = require('../dao/DetalleAreaTrabajoDAO');
const CaracteristicasService = require('./CaracteristicasService');

const DetalleAreaTrabajoService = {

    async createDetalleAreaTrabajo(idDetallePedido) {
        try {
            if (!idDetallePedido) {
                throw { status: 400, message: "idDetallePedido es requerido" };
            }

            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);
            if (!caracteristicas.length) {
                throw { status: 404, message: "No se encontraron características para este detalle de pedido" };
            }

            const detallesCreados = await Promise.all(
                caracteristicas.map(caracteristica =>
                    DetalleAreaTrabajoDAO.crearDetalleAreaTrabajo(
                        1,
                        caracteristica.idCaracteristicas,
                        0,
                        "",
                        0
                    )
                )
            );
            return detallesCreados;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    },

    async getDetalleAreaTrabajo(codigoPedido) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "Codigo de pedido es requerido" };
            }
            const DetallePedidoService = require('./DetallePedidoService');

            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            const detallesAreaTrabajo = await Promise.all(
                caracteristicas.map((caracteristica) =>
                DetalleAreaTrabajoDAO.getDetalleAreaTrabajo(caracteristica.idCaracteristicas)
                )
            );
            console.log("Detalles area trabajo",detallesAreaTrabajo);
            return detallesAreaTrabajo.flat();
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    },

    async updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado) {
        try {
            if (!idCaracteristicas) {
                throw { status: 400, message: "idCaracteristicas de pedido es requerido" };
            }

            if (cantidadAvance < 0) {
                throw { status: 400, message: "Cantidad de avance debe ser mayor o igual a 0" };
            }

            const obj = await DetalleAreaTrabajoDAO.updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado);
            if (!obj) {
                throw { status: 500, message: "No se pudo actualizar el detalle de área de trabajo" };
            }
            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    },

    async updateidAreaTrabajo(codigoPedido, nomArea){
        try{
            if (!codigoPedido) {
                throw { status: 400, message: "Codigo de pedido es requerido" };
            }
            if (!nomArea) {
                throw { status: 400, message: "Nombre de area es requerido" };
            }
            const DetallePedidoService = require('./DetallePedidoService');
            const AreaTrabajoService = require('./AreaTrabajoService');

            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            const {idArea} = await AreaTrabajoService.getAreaTrabajoByNombre(nomArea);

            const detallesAreaTrabajo = await Promise.all(
                caracteristicas.map((caracteristica) =>
                DetalleAreaTrabajoDAO.updateidAreaTrabajo(idArea, caracteristica.idCaracteristicas)
                )
            );
            return {message: "II: Se actualizo correctamente el area de trabajo", detallesAreaTrabajo};
        }catch(error){
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    }

};

module.exports = DetalleAreaTrabajoService;
