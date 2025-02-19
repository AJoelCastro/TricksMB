const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ProductoService = require('../services/ProductoService');
const TipoCalzadoService = require('../services/TipoCalzadoService');
const ClienteService = require('../services/ClienteService');

const PedidoController = {
    async createPedido(req, res) {
        try {
            let {
                clienteTipo, fechaEntrega, serieInicio, serieFinal, nomModelo, 
                color, talla, cantidad, nombreTaco, alturaTaco, material, tipoMaterial, 
                suela, accesorio, forro
            } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) throw { status: 400, message: `${nombreCampo} debe ser un número válido` };
                return numero;
            };

            serieInicio = convertirNumero(serieInicio, "serieInicio");
            serieFinal = convertirNumero(serieFinal, "serieFinal");
            cantidad = convertirNumero(cantidad, "cantidad");
            talla = convertirNumero(talla, "talla");
            alturaTaco = convertirNumero(alturaTaco, "alturaTaco");

            const cliente = await ClienteService.getCliente(clienteTipo);
            const modelo = await ModeloService.getModeloByNombre(nomModelo);
            const producto = await ProductoService.createProducto(modelo.idModelo);

            const pedido = await PedidoService.createPedido(cliente.idCliente, fechaEntrega, serieInicio, serieFinal);

            const fecha = new Date();
            const fechaStr = fecha.toISOString().slice(2, 10).replace(/-/g, ""); // "YYMMDD"
            const codigoPedido = `COD${fechaStr}${pedido.idPedido}`;

            const detallePedido = await DetallePedidoService.createDetallePedido(
                pedido.idPedido, producto.idProducto,codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorio, forro
            );

            return res.status(201).json({ message: "Pedido registrado con éxito", detallePedido });

        } catch (error) {
            console.error("Error al crear pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
};

module.exports = PedidoController;
