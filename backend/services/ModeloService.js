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
            const modelo =  await ModeloDAO.getModeloByNombre(nombre);
            if(!modelo){ 
                return res.status(404).json({ error: "Modelo no encontrado" });
            }else{
                return modelo;
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = ModeloService;