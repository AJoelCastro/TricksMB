const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ClienteService = require('../services/ClienteService');

const DetallePedidoController = {
    async createPedido(req, res, next) {
        try {
            let { 
                clienteTipo, fechaEntrega, serieInicio, serieFinal, nomModelo, nombreTaco, 
                alturaTaco, material, tipoMaterial, suela, accesorios, forro 
            } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) throw new Error(`${nombreCampo} debe ser un número válido`);
                return numero;
            };

            serieInicio = convertirNumero(serieInicio, "serieInicio");
            serieFinal = convertirNumero(serieFinal, "serieFinal");
            alturaTaco = convertirNumero(alturaTaco, "alturaTaco");

            const { idCliente } = await ClienteService.getCliente(clienteTipo);
            const { idModelo } = await ModeloService.getModeloByNombre(nomModelo);
            const { idPedido } = await PedidoService.createPedido(idCliente, fechaEntrega, serieInicio, serieFinal);

            const fecha = new Date();
            const fechaStr = fecha.toISOString().split("T")[0].replace(/-/g, ""); // "YYYYMMDD"
            const codigoPedido = `COD${fechaStr}${idPedido}`;

            const detallePedido = await DetallePedidoService.createDetallePedido(
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorios, forro
            );
            res.status(201).json({ detallePedido });

        } catch (error) {
            next(error);
        }
    },

    async getDetallePedidoByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            res.status(200).json({ detallePedido });
        } catch (error) {
            next(error);
        }
    },

    async updateDetallePedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro } = req.body;

            const detallePedido = await DetallePedidoService.updateDetallePedido(
                codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            res.status(200).json({ detallePedido });
        } catch (error) {
            next(error);
        }
    },

    async updateEstado(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { estado } = req.body;
            const detallePedido = await DetallePedidoService.updateEstado(codigoPedido, estado);
            res.status(200).json({ detallePedido });
        } catch (error) {
            next(error);
        }
    },

    async getAllDetallePedido(req, res, next) {
        try {
            const detallesPedidos = await DetallePedidoService.getAllDetallePedido();
            res.status(200).json({ detallesPedidos });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = DetallePedidoController;
