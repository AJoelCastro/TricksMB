const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');
const DetalleAreaTrabajoController = {

    async createDetalleAreaTrabajo(req, res) {
        try{
            const {nomArea, codigoPedido} = req.body;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(nomArea, codigoPedido);
            if(detallesAreaTrabajo.status !== 200) {
                const error = new Error(detallesAreaTrabajo.message);
                error.status = detallesAreaTrabajo.status;
                throw error;
            }
            return res.json({detallesAreaTrabajo, status: 200});
        } catch(error){
            console.error("Error al crear detalle de área de trabajo:", error);
            return res.json({ message: error.message || "Error interno del servidor", status: error.status||500});
        }
    },

    async getDetalleAreaTrabajo(req, res) {
        try {
            const {codigoPedido} = req.params;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.getDetalleAreaTrabajo(codigoPedido);
            return res.json({detallesAreaTrabajo, status: 200});
        } catch (error) {
            console.error("Error al obtener detalle de área de trabajo:", error);
            return res.json({ error: error.message || "Error interno del servidor", status: error.status  });
        }
    },

    async updateDetalleAreaTrabajo(req, res) {
        try {
            const {idCaracteristicas} = req.params;
            const { cantidadAvance, comentario, estado} = req.body;
            const detalleAreaTrabajo = await DetalleAreaTrabajoService.updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado);
            return res.json({detalleAreaTrabajo, status: 200});
        } catch (error) {
            return error("Error interno del servidor");
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