const DetalleEmpleadoPedidoService = require('../services/DetalleEmpleadoPedidoService');

const DetalleEmpleadoPedidoController = {
    async createDetalleEmpleadoPedido(req,res){
        try{
            const {dni, codigoPedido} = req.body;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.createDetalleEmpleadoPedido(dni, codigoPedido);
            if(!detalleEmpleadoPedido){
                return res.json({ success: false, message: "Error al registrar detalle empleado pedido", status: 400  });
            }
            res.json({ success: true, message: "Detalle empleado pedido registrado exitosamente", detalleEmpleadoPedido, status: 201 });
        }catch(error){
            console.error(error);
            res.json({ success: false, message: "Error al registrar detalle empleado pedido", status: 500  });
        }
    },

    async getAllDetalleEmpleadoPedido(req,res){
        try{ 
            const {nomArea, codigoPedido} = req.query;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.getAllDetalleEmpleadoPedido(nomArea, codigoPedido);
            console.log("detalleEmpleadoPedido", detalleEmpleadoPedido);
            if(!detalleEmpleadoPedido){
                return res.json({ message: "No hay empleados asigndados en esta are", status: 400  });
            }
            return res.json({ message: "Detalle empleado pedido obtenido exitosamente", detalleEmpleadoPedido, status: 201  });
        }catch(error){
            return res.json({ message: "Error interno del servidor", status: 500 });
        }
    }

}

module.exports = DetalleEmpleadoPedidoController;