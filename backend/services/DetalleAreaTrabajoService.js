const DetalleAreaTrabajoDAO = require("../dao/DetalleAreaTrabajo");
const CaracteristicasService = require("./CaracteristicasService");

const DetalleAreaTrabajoService = {
    async createDetalleAreaTrabajo(idDetallePedido) {
        try {
            if (!idAreaTrabajo || !idDetallePedido) {
                throw { status: 400, message: "idAreaTrabajo y idDetallePedido son requeridos" };
            }

            if (!Number.isInteger(cantidadAvance) || cantidadAvance <= 0) {
                throw { status: 400, message: "La cantidad debe ser un entero positivo" };
            }

            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);

            const detallesCreados = [];

            for (const caracteristica of caracteristicas) {
                const detalle = await DetalleAreaTrabajoDAO.crearDetalleAreaTrabajo(
                    idAreaTrabajo,
                    caracteristica.idCaracteristicas,
                    0,
                    "",
                    0
                );

                if (!detalle) {
                    throw { status: 500, message: "No se pudo crear el detalle de área de trabajo" };
                }

                detallesCreados.push(detalle);
            }

            return detallesCreados;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    }

    
};

module.exports = DetalleAreaTrabajoService;
