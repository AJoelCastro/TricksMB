const DetalleAreaTrabajoDAO = require("../dao/DetalleAreaTrabajo");

const DetalleAreaTrabajoService = {
    async createDetalleAreaTrabajo(idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario) {
        try {
            if (!idAreaTrabajo || !idCaracteristicas) {
                throw { status: 400, message: "idAreaTrabajo y idCaracteristicas son requeridos" };
            }

            if (!Number.isInteger(cantidadAvance) || cantidadAvance <= 0) {
                throw { status: 400, message: "La cantidad debe ser un entero positivo" };
            }

            const detalle = await DetalleAreaTrabajoDAO.crearDetalleAreaTrabajo({
                idAreaTrabajo,
                idCaracteristicas,
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
