const ProductoDAO = require('../dao/ProductoDAO');

const ProductoService = {

    async createProducto(idModelo){
        try{
            if(!idModelo) throw {status: 400, message:"El id del modelo es requerido"};
            return await ProductoDAO.createProducto(idModelo);
        }catch(error){
            throw error;
        }
    }
}

module.exports = ProductoService;