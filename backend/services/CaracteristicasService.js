const CaracteristicasDAO = require('../dao/CaracteristicasDAO');

const CaracteristicasService = {
    async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            if(!idDetallePedido || !talla || !cantidad || !color) throw {status: 400, message: "Parametros incorrectos"};
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
    }
}

module.exports = CaracteristicasService;