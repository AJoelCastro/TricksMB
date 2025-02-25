const CaracteristicasDAO = require('../dao/CaracteristicasDAO');

const CaracteristicasService = {
    async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            if(!idDetallePedido || !talla || !cantidad || !color) throw {status: 400, message: "Parametros incorrectos"};

            if(cantidad <= 0 || talla<=0) throw {status: 400, message: "Cantidad, talla o altura deben ser mayores a 0"};
            
            if (!Number.isInteger(cantidad) || !Number.isInteger(talla)) {
                throw { status: 400, message: "Cantidad y talla deben ser números enteros válidos" };
            }
            return await CaracteristicasDAO.createCaracteristicas(idDetallePedido, talla, cantidad, color);
        }catch(error){
            throw error;
        }
    },

    async getCaracteristicasByIdDetallePedido(idDetallePedido){
        try{
            if(!idDetallePedido) throw {status: 400, message: "Parametros incorrectos"};
            return await CaracteristicasDAO.getCaracteristicasByIdDetallePedido(idDetallePedido);
        }catch(error){
            throw error;
        }
    },

    async updateCaracteristicas(codigoPeido,idCaracteristicas, talla, cantidad, color){
        try{
            if(!codigoPeido || !idCaracteristicas || !talla || !cantidad || !color) throw {status: 400, message: "Parametros incorrectos"}
            if(cantidad <= 0 || talla<=0) throw {status: 400, message: "Cantidad, talla o altura deben ser mayores a 0"};

            if (!Number.isInteger(cantidad) || !Number.isInteger(talla)) {
                throw { status: 400, message: "Cantidad y talla deben ser números enteros válidos" };
            }

            return await CaracteristicasDAO.updateCaracteristicas(codigoPeido,idCaracteristicas, talla, cantidad, color);
        }catch(error){
            throw error;
        }
    }
}

module.exports = CaracteristicasService;