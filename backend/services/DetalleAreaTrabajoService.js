const DetalleAreaTrabajoDAO = require("../dao/DetalleAreaTrabajo");
const CaracteristicasService = require("./CaracteristicasService");
const DetallePedidoService = require("./DetallePedidoService");
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
                        idAreaTrabajo,
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
            const {idDetallePedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);
            const detallesAreaTrabajo = await Promise.all(
                caracteristicas.map((caracteristica) =>
                DetalleAreaTrabajoDAO.getDetalleAreaTrabajo(caracteristica.idCaracteristicas)
                )
            );

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
    }
};

module.exports = DetalleAreaTrabajoService;
