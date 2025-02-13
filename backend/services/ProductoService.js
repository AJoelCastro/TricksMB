const ProductoDAO = require('../dao/ProductoDAO');

const ProductoService = {

    async createProducto(idModelo){
        try{
            if(!idModelo) throw new Error('El id del modelo es requerido');
            return await ProductoDAO.createProducto(idModelo);
        }catch(error){
            throw error;
        }
    }
}

module.exports = ProductoService;