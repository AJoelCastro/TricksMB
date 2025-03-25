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
            if(!nombre) throw{status: 400 , message: "nombre requerido"};
            return await ModeloDAO.getModeloByNombre(nombre);
        }catch(error){
            throw error;
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

    async getModeloById(idModelo){
        try{
            if(!idModelo) throw {status: 400, message: "idModelo requerido"};
            return await ModeloDAO.getModeloById(idModelo);
        }catch(error){
            throw error;
        }
    }

}

module.exports = ModeloService;