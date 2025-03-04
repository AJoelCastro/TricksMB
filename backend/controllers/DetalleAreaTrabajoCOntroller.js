const { getDetalleAreaTrabajo, updateDetalleAreaTrabajo } = require('../dao/DetalleAreaTrabajo');
const AreaTrabajoService = require('../services/AreaTrabajoService');
const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const DetalleAreaTrabajoController = {
    async getDetalleAreaTrabajo(req, res) {
        try {
            const {codigoPedido} = req.params;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.getDetalleAreaTrabajo(codigoPedido);
            return res.status(200).json(detallesAreaTrabajo);
        } catch (error) {
            console.error("Error al obtener detalle de área de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async updateDetalleAreaTrabajo(req, res) {
        try {
            const {idCaracteristicas, cantidadAvance, comentario, estado} = req.body;
            const detalleAreaTrabajo = await DetalleAreaTrabajoService.updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado);
            return res.status(200).json(detalleAreaTrabajo);
        } catch (error) {
            console.error("Error al actualizar detalle de área de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = DetalleAreaTrabajoController;