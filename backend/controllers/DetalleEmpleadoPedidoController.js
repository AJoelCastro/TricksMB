const DetalleEmpleadoPedidoService = require('../services/DetalleEmpleadoPedidoService');

const DetalleEmpleadoPedidoController = {
    async createDetalleEmpleadoPedido(req,res){
        try{
            const {dni, codigoPedido} = req.body;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.createDetalleEmpleadoPedido(dni, codigoPedido);
            if(!detalleEmpleadoPedido){
                return res.json({ success: false, message: "Error al registrar detalle empleado pedido", status: error.status  });
            }
            res.json({ success: true, message: "Detalle empleado pedido registrado exitosamente", detalleEmpleadoPedido, status: 201 });
        }catch(error){
            console.error(error);
            res.json({ success: false, message: "Error al registrar detalle empleado pedido", status: error.status  });
        }
    },

    async getAllDetalleEmpleadoPedido(req,res){
        try{ 
            const {nomArea, codigoPedido} = req.query;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.getAllDetalleEmpleadoPedido(nomArea, codigoPedido);
            if(!detalleEmpleadoPedido){
                res.json({ success: false, message: "Error al obtener detalle empleado pedido", status: error.status  });
            }
            res.json({ success: true, message: "Detalle empleado pedido obtenido exitosamente", detalleEmpleadoPedido, status: error.status  });
        }catch(error){
            console.error(error);
            res.json({ success: false, message: "Error al obtener detalle empleado pedido", status: error.status  });
        }
    }

}

module.exports = DetalleEmpleadoPedidoController;