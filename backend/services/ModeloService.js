const ModeloDAO = require('../dao/ModeloDAO');

const ModeloService = {

    async createModelo(idTipo, nombre){
        try{
            if (!idTipo) throw { status: 400, message: "idTipo requerido" };
            if(!nombre) throw {status: 400, message: "nombre requerido"};
            return await ModeloDAO.createModelo(idTipo, nombre);
        }catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en ModeloService", detalle: error.message};
        }
    },

    async getAllModelo(){
        try{
            return await ModeloDAO.getAllModelo();
        }catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en ModeloService", detalle: error.message};
        }
    },

    async getModeloByNombre(nombre){
        try{
            if(!nombre) {
                const errorNombre = new Error("Nombre requerido");
                errorNombre.status = 400;
                throw errorNombre;
            };
            return await ModeloDAO.getModeloByNombre(nombre);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error interno al buscar modelo por nombre"};
        }
    },

    async getAllModeloById(idTipo){
        try{
            if(!idTipo) throw{status: 400 , message: "id requerido"};
            return await ModeloDAO.getAllModeloById(idTipo);
        }catch(error){
            throw error;
        }
    },

    async getModeloByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw {status: 400, message: "Código de pedido requerido"};
            return await ModeloDAO.getModeloByCodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    },
    //CambiarNombre
    async getModeloById(idModelo){
        try{
            if(!idModelo) throw {status: 400, message: "idModelo requerido"};
            return await ModeloDAO.getModeloById(idModelo);
        }catch(error){
            throw error;
        }
    },

    async getStockForModelo(){
        const CaracteristicasService = require("./CaracteristicasService");
        const DetallePedidoDAO = require("../dao/DetallePedidoDAO");
        try{
            let detallesPedidos = await DetallePedidoDAO.getAllDetallesPedidos();
            const stockModelos = await Promise.all(detallesPedidos.map(async (pedidos) =>{
                const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(pedidos.idDetalle_pedido);
                const modelo = await this.getModeloByCodigoPedido(pedidos.Codigo_pedido)

                return caracteristicas.map(caracteristica => ({
                    CodigoPedido: pedidos.Codigo_pedido,
                    Modelo: modelo.Nombre,
                    Talla: caracteristica.Talla,
                    Cantidad: caracteristica.Cantidad,
                    Color: caracteristica.Color
                }));
            }))

            return stockModelos;
        }catch(error){
            if(error.status) throw error;
            throw{status: 500, message:  "Error en el DetalleService: Stock por modelo", detalle:error.message}
        }
    }

}

module.exports = ModeloService;