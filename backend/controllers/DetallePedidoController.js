const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ClienteService = require('../services/ClienteService');
const errorHandler = require('../utils/errorHandler');

const DetallePedidoController = {
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
            res.json({detallePedido, status: 201});

        } catch (error) {
            console.error("Error al crear pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getDetallePedidoByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            res.json({detallePedido, status: 200});
        } catch (error) {
            console.error("Error al obtener detalle pedido por código:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async updateDetallePedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const {nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro} = req.body;
            const detallePedido = await DetallePedidoService.updateDetallePedido(
                codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            res.json({detallePedido, status: 200});
        }
        catch (error) {
            console.error("Error al actualizar detalle pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },
    async updateEstado(req, res) {
        try {
            const {codigoPedido} = req.params;
            const {estado} = req.body;
            const detallePedido = await DetallePedidoService.updateEstado(codigoPedido, estado);
            return res.json({detallePedido, status: 200});
        }
        catch (error) {
            console.error("Error al actualizar el estado del pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getAllDetallePedido(req, res, next){
        try{
            const detallesPedidos = await DetallePedidoService.getAllDetallePedido();
            res.json({detallesPedidos, status: 200});
        }catch(error){
            console.log(error);
            next(error);
        }
    }
};

module.exports = DetallePedidoController;
