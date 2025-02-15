const DetalleAreaTrabajoDAO = require("../dao/DetalleAreaTrabajo");

const DetalleAreaTrabajoService = {
    async createDetalleAreaTrabajo(idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario) {
        try {
            if (!idAreaTrabajo || !Detalle_pedido_idDetalle_pedido) {
                throw { status: 400, message: "idAreaTrabajo y Detalle_pedido_idDetalle_pedido son requeridos" };
            }

            if (!Number.isInteger(cantidadAvance) || cantidadAvance <= 0) {
                throw { status: 400, message: "La cantidad debe ser un entero positivo" };
            }

            const detalle = await DetalleAreaTrabajoDAO.crearDetalleAreaTrabajo({
                idAreaTrabajo,
                Detalle_pedido_idDetalle_pedido,
                cantidadAvance,
                comentario
            });

            if (!detalle)
                throw { status: 500, message: "No se pudo crear el detalle de área de trabajo" };

            return detalle;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    }
};

module.exports = DetalleAreaTrabajoService;
