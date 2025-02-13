const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ProductoService = require('../services/ProductoService');
const TipoCalzadoService = require('../services/TipoCalzadoService');
const ClienteService = require('../services/ClienteService');

const PedidoController = {
    async createPedido(req, res) {
        try {
            const {
                clienteTipo, fechaEntrega, serieInicio, serieFinal, nomTipoCalzado, nomModelo, 
                color, talla, cantidad, nombreTaco, alturaTaco, material, tipoMaterial, 
                suela, accesorio, forro
            } = req.body;

            if (!clienteTipo || !fechaEntrega || !serieInicio || !serieFinal || !nomTipoCalzado || !nomModelo ||
                !color || !talla || !cantidad || !nombreTaco || !alturaTaco || !material || !tipoMaterial ||
                !suela || !accesorio || !forro) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            if (isNaN(talla) || isNaN(cantidad) || isNaN(alturaTaco)) {
                return res.status(400).json({ error: "Talla, cantidad y altura de taco deben ser números válidos" });
            }

            const cliente = await ClienteService.getCliente(clienteTipo);

            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByNombre(nomTipoCalzado);

            const modelo = await ModeloService.getModeloByNombre(nomModelo);

            const producto = await ProductoService.createProducto(tipoCalzado.idTipoCalzado, modelo.idModelo);

            const pedido = await PedidoService.createPedido(cliente.idCliente, fechaEntrega, serieInicio, serieFinal);
            if (!pedido) return res.status(500).json({ error: "Error al registrar pedido" });

            const fecha = new Date();
            const fechaStr = fecha.toISOString().slice(2, 10).replace(/-/g, ""); // "YYMMDD"
            const codigoPedido = `COD${fechaStr}${pedido.idPedido}`;

            const detallePedido = await DetallePedidoService.createDetallePedido(
                pedido.idPedido, producto.idProducto, codigoPedido, 
                color, talla, cantidad, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorio, forro
            );

            return res.status(201).json({ message: "Pedido registrado con éxito", detallePedido });

        } catch (error) {
            console.error("Error al crear pedido:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};

module.exports = PedidoController;
