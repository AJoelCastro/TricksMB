const ModeloDAO = require('../dao/ModeloDAO');

const ModeloService = {
    async getAllModelo(){
        try{
            return await ModeloDAO.getAllModelo();
        }catch(error){
            throw error;
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

    async getAllModeloById(id){
        try{
            if(!id) throw{status: 400 , message: "id requerido"};
            return await ModeloDAO.getAllModeloById(id);
        }catch(error){
            throw error;
        }
    }
}

module.exports = ModeloService;