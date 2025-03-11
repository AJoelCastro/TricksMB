const DetalleEmpleadoPedidoDAO = require('../dao/DetalleEmpleadoPedidoDAO');

const DetalleEmpleadoPedidoService = {
    async createDetalleEmpleadoPedido(dni, codigoPedido){
        try{
            if(!dni) throw {status: 400, message: "dni requerido para crear detalle empleado pedido"};
            if(!codigoPedido) throw {status: 400, message: "codigoPedido requerido para crear detalle empleado pedido"};
            const EmpleadoService = require('./EmpleadoService');
            const DetallePedidoService = require('./DetallePedidoService');
            const {idEmpleado} = await EmpleadoService.getByDni(dni);
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            
            return await DetalleEmpleadoPedidoDAO.createDetalleEmpleadoPedido(idEmpleado, idDetalle_pedido);
        }catch(error){
            throw error;
        }
    }
}

module.exports = DetalleEmpleadoPedidoService;