const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');
const DetalleAreaTrabajoController = {

    async createDetalleAreaTrabajo(req, res) {
        try{
            const {nomArea, codigoPedido} = req.body;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(nomArea, codigoPedido);
            return res.status(200).json(detallesAreaTrabajo);
        } catch(error){
            console.error("Error al crear detalle de área de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor"});
        }
    },

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
            const {idCaracteristicas} = req.params;
            const { cantidadAvance, comentario, estado} = req.body;
            const detalleAreaTrabajo = await DetalleAreaTrabajoService.updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado);
            return res.status(200).json(detalleAreaTrabajo);
        } catch (error) {
            console.error("Error al actualizar detalle de área de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    /*async updateidAreaTrabajo(req, res){
        try{
            const {codigoPedido} = req.params;
            const mensaje = await DetalleAreaTrabajoService.updateidAreaTrabajo(codigoPedido);
            return res.status(200).json(mensaje);
        }catch(error){
            console.log("Error ", error);
            console.error("Error al actualizar el Area de trabajo", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor"});
        }
    }*/

};

module.exports = DetalleAreaTrabajoController;