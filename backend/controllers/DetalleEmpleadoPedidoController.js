
const DetalleEmpleadoPedidoService = require('../services/DetalleEmpleadoPedidoService');

const DetalleEmpleadoPedidoController = {
    async createDetalleEmpleadoPedido(req,res){
        try{
            const {dni, codigoPedido} = req.body;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.createDetalleEmpleadoPedido(dni, idPcodigoPedidoedido);
            if(!detalleEmpleadoPedido){
                return res.status(400).json({ success: false, message: "Error al crear detalle empleado pedido" });
            }
            res.status(201).json({ success: true, message: "Detalle empleado pedido registrado exitosamente", detalleEmpleadoPedido });
        }catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: "Error al registrar detalle empleado pedido" });
        }
    }

}

module.exports = DetalleEmpleadoPedidoController;