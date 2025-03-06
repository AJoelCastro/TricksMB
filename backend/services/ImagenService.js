const ImagenDAO = require('../dao/ImagenDAO');

const ImagenService = {

    async getImagen(idModelo){
        try{
            if(!idModelo) throw {status: 400, message: "campos obligatorios"};
            
            const imagen = await ImagenDAO.getImagen(idModelo);
            if(!imagen) throw {status:400, message: "La imagen no existe"}

            return imagen;
        } catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en ModeloService", detalle: error.message};
        }
    }
}

module.exports = ImagenService;