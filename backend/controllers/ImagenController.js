const ImagenService = require('../services/ImagenService');

const ImagenController = {
    async getImagen(req,res){
        try{
            const {idModelo} = req.params;
            const imagen = await ImagenService.getImagen(idModelo);
            res.json({imagen, status: 200});
        } catch(error){
            console.error("Error al obtener imagen por id:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    }

}

module.exports = ImagenController