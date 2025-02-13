const DetallePedidoDAO = require('../dao/DetallePedidoDAO');

const DetallePedidoService = {

    async createDetallePedido(idPedido, idProducto,color, talla, cantidad, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorio, forro){
        try{
            if (!idPedido || !idProducto) throw new Error("idPedido e idProducto son obligatorios");
            if (cantidad <= 0)  throw new Error("Cantidad debe ser mayor a 0");

            return await DetallePedidoDAO.createDetallePedido(idPedido, idProducto,color, talla, 
                cantidad, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorio, forro);
        }catch(error){
            throw error;
        }
    },
    
    async getDetallePedidoBycodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw new Error('El código de pedido es requerido');
            return await DetallePedidoDAO.getDetallePedidoBycodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    }
}

module.exports = DetallePedidoService;