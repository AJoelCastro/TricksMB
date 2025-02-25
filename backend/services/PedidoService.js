const PedidoDAO = require('../dao/PedidoDAO')

const PedidoService = {
    async createPedido(idCliente, FechaEntrega,SerieInicio, SerieFinal){
        try{
            if(!idCliente || !FechaEntrega || !SerieInicio || !SerieFinal) 
                throw {status: 401,message:"Campos requeridos"};
            const pedido = await PedidoDAO.createPedido(idCliente, FechaEntrega, SerieInicio, SerieFinal);
            if(!pedido)
                throw {status: 500, message: "Registro de pedido no exitos"};
            return pedido;
        } catch(error){
            throw error;
        }
    },

    async getPedidoByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido)
                throw {status: 401, message: "Código de pedido requerido"};
            const pedido = await PedidoDAO.getPedidoByCodigoPedido(codigoPedido);
            if(!pedido)
                throw {status: 404, message: "Pedido no encontrado"};
            return pedido;
        } catch(error){
            throw error;
        }
    },

    async updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal){
        try{
            if(!codigoPedido || !fechaEntrega || !serieInicio || !serieFinal)
                throw {status: 401, message: "Campos requeridos"};
            const pedido = await PedidoDAO.updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal);
            if(!pedido)
                throw {status: 500, message: "No se pudo actualizar el pedido"};
            return pedido;
        } catch(error){
            throw error;
        }
    }
}

module.exports = PedidoService;