const DetallePedidoDAO = require('../dao/DetallePedidoDAO');;

const DetallePedidoService = {
    async createDetallePedido(idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela,
        accesorios, forro) {
        try {
            if (!idPedido || !idModelo) {
                throw { status: 400, message: "idPedido e idModelo son obligatorios" };
            }
            
            alturaTaco = Number(alturaTaco);

            if (alturaTaco <= 0) {
                throw { status: 400, message: "Cantidad, talla o altura deben ser mayores a 0" };
            }

            if ( !Number.isInteger(alturaTaco)) {
                throw { status: 400, message: "altura de taco deben ser números enteros válidos" };
            }

            const detallePedido = await DetallePedidoDAO.createDetallePedido(
                idPedido, idModelo,codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            if (!detallePedido) {
                throw { status: 500, message: "No se pudo registrar el detalle del pedido" };
            }

            return detallePedido;
        } catch (error) {
            if (error.status) throw error; // Si ya tiene status, lo relanzamos
            throw { status: 500, message: "Error en DetallePedido Service", detalle: error.message };
        }
    },

    async getDetallePedidoByCodigoPedido(codigoPedido) {
        try {
            if (!codigoPedido) {
                const errorCodigoPedido = new Error("El código de pedido es requerido");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            }
            const obj =  await DetallePedidoDAO.getDetallePedidoByCodigoPedido(codigoPedido);
            if (!obj) {
                const errorObj = new Error("No se encontró el detalle de pedido");
                errorObj.status = 404;
                throw errorObj;
            }
            return obj;
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error en DetallePedido Service" }
        }
    },

    async updateDetallePedido(codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela,
        accesorios, forro) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const obj = await DetallePedidoDAO.updateDetallePedido(codigoPedido, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorios, forro);
            if (!obj) {
                throw { status: 500, message: "No se pudo actualizar el detalle del pedido" };
            }
            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetallePedido Service", detalle: error.message }
        }
    },

    async updateEstado(codigoPedido, estado) {
        const DetalleAreaTrabajoService = require('./DetalleAreaTrabajoService');
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }

            const obj = await DetallePedidoDAO.updateEstado(codigoPedido, estado);
            if (obj.estado === "Proceso") {
                let nomArea = "Corte";
                const detalleAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(nomArea,codigoPedido);
                return { mensaje: "Pedido en proceso y detalle de área de trabajo creado", detalleAreaTrabajo };
            }

            return obj;
        } catch (error) {
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetallePedido Service", detalle: error.message };
        }
    },

    async getAllCodigosPedidos(){
        try{
            
            const pedidos = await DetallePedidoDAO.getAllCodigosPedidos();
            if(pedidos.length === 0){
                const errorGetAllDetallePedido = new Error("No se encontraron pedidos");
                errorGetAllDetallePedido.status = 404;
                throw errorGetAllDetallePedido;
            }
            return pedidos;
        } catch(error){
            throw error.status? error: {status: 500, message: "Error en Detalle Pedido Service"};
        }
    }, 
    
    async getDetallePedidoByidDetallePedido(idDetalle_pedido) {
        try {
            if (!idDetalle_pedido) {
                const errorIdDetallePedido = new Error("El id del detalle de pedido es requerido");
                errorIdDetallePedido.status = 400;
                throw errorIdDetallePedido;
            }
            const obj =  await DetallePedidoDAO.getDetallePedidoById(idDetalle_pedido);
            if (obj.length === 0) {
                const errorObj = new Error("Detalle de pedido no encontrado");
                errorObj.status = 404;
                throw errorObj;
            }
            return obj;
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error en DetallePedido Service", detalle: error.message }
        }
    },

    async getHistorialPedidos(){
        const ImagenService = require('./ImagenService')
        try{
            const detallePedidos = await DetallePedidoDAO.getAllDetallesPedidos();
            const historialPedidos = await Promise.all(detallePedidos.map(async (pedido) => {
                const imagenes = await ImagenService.getImagen(pedido.Modelo_idModelo);
                const urls = imagenes.map(img => img.Url);
                return {
                        Imagenes: urls,
                        Codigo_pedido: pedido.Codigo_pedido,
                        Fecha_creacion: new Date(pedido.Fecha_creacion).toLocaleDateString('es-ES'),
                    };
            }));
            return historialPedidos;
        }catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en el DetallePedidoService: historial", detalle: error.message}
        }
    }
};

module.exports = DetallePedidoService;
