const DetalleEmpleadoPedidoService = require('../services/DetalleEmpleadoPedidoService');

const DetalleEmpleadoPedidoController = {
    async createDetalleEmpleadoPedido(req,res){
        try{
            const {dni, codigoPedido} = req.body;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.createDetalleEmpleadoPedido(dni, codigoPedido);
            if(!detalleEmpleadoPedido){
                return res.status(400).json({ success: false, message: "Error al crear detalle empleado pedido" });
            }
            res.status(201).json({ success: true, message: "Detalle empleado pedido registrado exitosamente", detalleEmpleadoPedido });
        }catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: "Error al registrar detalle empleado pedido" });
        }
    },

    async getAllDetalleEmpleadoPedido(req,res){
        try{ 
            const {nomArea, codigoPedido} = req.query;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.getAllDetalleEmpleadoPedido(nomArea, codigoPedido);
            if(!detalleEmpleadoPedido){
                return res.status(400).json({ success: false, message: "1Error al obtener detalle empleado pedido" });
            }
            res.status(200).json({ success: true, message: "Detalle empleado pedido obtenido exitosamente", detalleEmpleadoPedido });
        }catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: "2Error al obtener detalle empleado pedido" });
        }
    }

}

module.exports = DetalleEmpleadoPedidoController;