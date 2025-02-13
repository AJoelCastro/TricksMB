const PedidoDAO = require('../dao/PedidoDAO')

const PedidoService = {
    async createPedido(idCliente, FechaEntrega,SerieInicio, SerieFinal){
        if(!idCliente || !FechaEntrega || !SerirInicio || !SerieFinal) throw new Error('Todos los campos son requeridos');
        return await PedidoDAO.createPedido(idCliente, FechaEntrega, SerieInicio, SerieFinal);
    }
}

module.exports = PedidoService;