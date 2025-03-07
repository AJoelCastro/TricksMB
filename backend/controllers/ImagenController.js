const ImagenService = require('../services/ImagenService');

const ImagenController = {
    async getImagen(req,res){
        try{
            const {idModelo} = req.params;
            console.log(idModelo);
            const imagen = await ImagenService.getImagen(idModelo);
            console.log(imagen);
            return  res.status(200).json(imagen);
        } catch(error){
            console.error("Error al obtener imagen por id:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }

}

module.exports = ImagenController