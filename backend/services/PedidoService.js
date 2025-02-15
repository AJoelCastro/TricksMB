const PedidoDAO = require('../dao/PedidoDAO')

const PedidoService = {
    async createPedido(idCliente, FechaEntrega,SerieInicio, SerieFinal){
        try{
            if(!idCliente || !FechaEntrega || !SerirInicio || !SerieFinal) 
                throw {status: 401,message:"Campos requeridos"};
            const pedido = await PedidoDAO.createPedido(idCliente, FechaEntrega, SerieInicio, SerieFinal);
            if(!pedido)
                throw {status: 500, message: "Registro de pedido no exitos"};
            return pedido;
        } catch(error){
            throw error;
        }
    }
}

module.exports = PedidoService;