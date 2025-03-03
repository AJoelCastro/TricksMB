const AreaTrabajoService = require('../services/AreaTrabajoService');
const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const CaracteristicasService = require('../services/CaracteristicasService');
const DetalleAreaTrabajoController = {
    async createDetalleAreaTrabajo(req, res) {
        try{
            let{nombreAreaTrabajo, codigoPedido} = req.body;

            const areaTrabajo = await AreaTrabajoService.getAreaTrabajobyNombre(nombreAreaTrabajo);
            const {idDetallePedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            
            const detallesCreados = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(areaTrabajo.idAreaTrabajo, idDetallePedido, 0, "", "0");

            return res.status(201).json({message: "Detalles de area de trabajo registrados con éxito", detallesCreados});

        }catch(error){
            console.error("Error al crear detalle de area de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor)" });
        }
    }
};

module.exports = DetalleAreaTrabajoController;