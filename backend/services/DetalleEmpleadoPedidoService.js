const DetalleEmpleadoPedidoDAO = require('../dao/DetalleEmpleadoPedidoDAO');
const EmpleadoService = require('./EmpleadoService');
const AreaTrabajoService = require('./AreaTrabajoService');
const DetallePedidoService = require('./DetallePedidoService');
const DetalleEmpleadoPedidoService = {
    async createDetalleEmpleadoPedido(dni, codigoPedido){
        try{
            if(!dni) throw {status: 400, message: "dni requerido para crear detalle empleado pedido"};
            if(!codigoPedido) throw {status: 400, message: "codigoPedido requerido para crear detalle empleado pedido"};

            const {idEmpleado} = await EmpleadoService.getByDni(dni);
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            
            return await DetalleEmpleadoPedidoDAO.createDetalleEmpleadoPedido(idEmpleado, idDetalle_pedido);
        }catch(error){
            throw error;
        }
    },

    async getAllDetalleEmpleadoPedido(nomArea, codigoPedido){
        try{
            if(!nomArea) throw {status: 400, message: "nombre de area requerido para buscar detalle empleado pedido"};
            if(!codigoPedido) throw {status: 400, message: "codigo de pedido requerido para buscar detalle empleado pedido"};

            const {idArea} = await AreaTrabajoService.getAreaTrabajoByNombre(nomArea);
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);

            return await DetalleEmpleadoPedidoDAO.getAllDetallePedido(idArea, idDetalle_pedido);
        } catch(error){
            console.error("Error al obtener detalle empleado pedido", error);
            throw error;
        }
    }
}

module.exports = DetalleEmpleadoPedidoService;