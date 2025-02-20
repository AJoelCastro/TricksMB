const AreaTrabajoService = require('../services/AreaTrabajoService');
const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const CaracteristicasService = require('../services/CaracteristicasService');
const DetalleAreaTrabajoController = {
    async createDetalleAreaTrabajo(req, res) {
        try{
            let{nombreAreaTrabajo, codigoPedido, cantidadAvance, comentario,} = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) throw { status: 400, message: `${nombreCampo} debe ser un número válido` };
                return numero;
            }

            cantidadAvance = convertirNumero(cantidadAvance, "cantidadAvance");

            const areaTrabajo = await AreaTrabajoService.getAreaTrabajobyNombre(nombreAreaTrabajo);
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(detallePedido.idDetallePedido);
            const detalleAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(
                areaTrabajo.idAreaTrabajo, caracteristicas.idCaracteristicas, cantidadAvance, comentario
            );

            return res.status(201).json({message: "Detalle de area de trabajo registrado con éxito", detalleAreaTrabajo});

        }catch(error){
            console.error("Error al crear detalle de area de trabajo:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor)" });
        }
    }
};

module.exports = DetalleAreaTrabajoController;