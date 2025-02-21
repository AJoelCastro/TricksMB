const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ClienteService = require('../services/ClienteService');

const PedidoController = {
    async createPedido(req, res) {
        try {
            let {
                clienteTipo, fechaEntrega, serieInicio, serieFinal, nomModelo, nombreTaco, alturaTaco, material, tipoMaterial, 
                suela, accesorios, forro
            } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) return res.status(400).json({ message: `${nombreCampo} debe ser un número válido`});
                return numero;
            };

            serieInicio = convertirNumero(serieInicio, "serieInicio");
            serieFinal = convertirNumero(serieFinal, "serieFinal");
            alturaTaco = convertirNumero(alturaTaco, "alturaTaco");
            const {idCliente} = await ClienteService.getCliente(clienteTipo);
            const {idModelo} = await ModeloService.getModeloByNombre(nomModelo);
            const {idPedido} = await PedidoService.createPedido(idCliente, fechaEntrega, serieInicio, serieFinal);
            const fecha = new Date();
            const fechaStr = fecha.toISOString().split("T")[0];// "YYMMDD"
            const codigoPedido = `COD${fechaStr}${idPedido}`;
            
            const detallePedido = await DetallePedidoService.createDetallePedido(
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorios, forro
            );
            return res.status(201).json(detallePedido);

        } catch (error) {
            console.error("Error al crear pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = PedidoController;
