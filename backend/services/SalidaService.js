const SalidaDAO = require("../dao/SalidaDAO")

const SalidaService = {
    createSalida: async (idCaja, codigoPedido) => {
        const DetalleAlmacenService = require('./DetalleAlmacenService');
        const pedidoService = require('./PedidoService');
        const GuiaSalidaService = require('./GuiaSalidaService');
        try{
            if(!codigoPedido || !idCaja){
                const errorCampos = new Error("Campos requeridos");
                errorCampos.status = 401;
                throw errorCampos;
            }
            console.log(codigoPedido);
            console.log(idCaja);
            const pedido = await pedidoService.getPedidoByCodigoPedido(codigoPedido);
            
            if(!pedido){
                const errorPedido = new Error("Pedido no encontrado");
                errorPedido.status = 404;
                throw errorPedido;
            }
            console.log(pedido);
            const detalleAlmacen = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            
            if(!detalleAlmacen){
                const errorDetalleAlmacen = new Error("Detalle Almacen no encontrado");
                errorDetalleAlmacen.status = 404;
                throw errorDetalleAlmacen;
            }
            console.log(detalleAlmacen);
            const guiaSalida = await GuiaSalidaService.getGuiaSalidaByIdCliente(pedido.Cliente_idCliente);

            const salida = await SalidaDAO.createSalida(detalleAlmacen[0].idDetalle_almacen, idCaja, guiaSalida[0].idGuia_salida);
            return salida;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en Salida Service"}
        }
    }
}

module.exports = SalidaService;