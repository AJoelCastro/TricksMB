const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ClienteService = require('../services/ClienteService');

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
            return res.status(201).json(detallePedido);

        } catch (error) {
            console.error("Error al crear pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getDetallePedidoByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            return res.status(200).json(detallePedido);
        } catch (error) {
            console.error("Error al obtener detalle pedido por código:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async updateDetallePedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const {nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro} = req.body;
            const detallePedido = await DetallePedidoService.updateDetallePedido(
                codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            return res.status(200).json(detallePedido);
        }
        catch (error) {
            console.error("Error al actualizar detalle pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },
    async updateEstado(req, res) {
        try {
            const {codigoPedido} = req.params;
            const {estado} = req.body;
            const detallePedido = await DetallePedidoService.updateEstado(codigoPedido, estado);
            return res.status(200).json(detallePedido);
        }
        catch (error) {
            console.error("Error al actualizar el estado del pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getAllDetallePedido(req, res){
        try{
            const detallesPedidos = await DetallePedidoService.getAllDetallePedido();
            return res.status(200).json(detallesPedidos);
        }catch(erorr){
            console.error("Error al actualizar el estado del pedido");
            return res.status(error.status || 500).json({error: error.message}|| "Error interno del servidor");
        }
    }
};

module.exports = DetallePedidoController;
