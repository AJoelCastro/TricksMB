const DetallePedidoDAO = require('../dao/DetallePedidoDAO');;

const DetallePedidoService = {
    async createDetallePedido(idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela,
        accesorios, forro) {
            const DetalleAlmacenService = require('./DetalleAlmacenService');
        try {
            if (!idPedido || !idModelo) {
                const errorId = new Error("idPedido e idModelo son obligatorios");
                errorId.status = 400;
                throw errorId;
            }
            
            alturaTaco = Number(alturaTaco);

            if (alturaTaco <= 0) {
                const errorAltura = new Error("Cantidad, talla o altura deben ser mayores a 0");
                errorAltura.status = 400;
                throw errorAltura;
            }

            if ( !Number.isInteger(alturaTaco)) {
                const errorAlturaTaco = new Error("Altura de taco debe ser números enteros válidos");
                errorAlturaTaco.status = 400;
                throw errorAlturaTaco;
            }

            const detallePedido = await DetallePedidoDAO.createDetallePedido(
                idPedido, idModelo,codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );

            await DetalleAlmacenService.createDetalleAlmacen("Fabrica", codigoPedido);

            return detallePedido;
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error en DetallePedido Service" };
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
                        Estado: pedido.Estado
                    };
            }));
            return historialPedidos;
        }catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en el DetallePedidoService: historial", detalle: error.message}
        }
    },

    async updateCantidad(codigoPedido) {
        const CaracteristicasService = require("../services/CaracteristicasService");
        try {
            if (!codigoPedido) {
                const errorCodigoPedido = new Error("El código de pedido es requerido");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;    
            }

            const {idDetalle_pedido} = await this.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            console.log("caracteristicas",caracteristicas);
            const cantidadTotal = caracteristicas.reduce((total, caracteristica) => total + caracteristica.Cantidad, 0);
            
            return await DetallePedidoDAO.updateCantidad(idDetalle_pedido, cantidadTotal);
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error en DetallePedido Service", detalle: error.message };
        }
    }
};

module.exports = DetallePedidoService;
