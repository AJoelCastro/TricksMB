const TipoCalzadoDAO = require('../dao/TipoCalzadoDAO');

const TipoCalzadoService = {

    async getAllTipoCalzado(){
        try{
            return await TipoCalzadoDAO.getAllTipoCalzado();
        }catch(error){
            throw error;
        }
    },

    async getTipoCalzadoByNombre(nombre){
        try{
            const calzado =  await TipoCalzadoDAO.getTipoCalzadoByNombre(nombre);
            if(!calzado){
                return res.status(404).json({ error: "Tipo de calzado no encontrado" });
            }else{
                return calzado;
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = TipoCalzadoService;