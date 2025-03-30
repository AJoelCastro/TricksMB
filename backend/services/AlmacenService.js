const AlmacenDAO = require('../dao/AlmacenDAO');

const AlmacenService = {
    async createAlmacen(nombre, imagen, Direccion){
        try{
            if(!nombre || !imagen || !Direccion) throw {status: 400, message: "Campos obligatorios"};
            return await AlmacenDAO.createAlmacen(nombre, imagen, Direccion);
        }catch(error){
            throw error
        }
    },

    async getAlmacen(nombre){
        try{
            if(!nombre) throw {status: 400, message: "Parametros incorrectos"};
            return await AlmacenDAO.getAlmacen(nombre);
        }catch(error){
            throw error;
        }
    },

    async updateStock(CodigoPedido, cantidad){
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!CodigoPedido || !cantidad) throw {status: 400, message: "Parametros incorrectos"};
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(CodigoPedido);
            return await AlmacenDAO.updateStock(idDetalle_pedido, cantidad);
        }catch(error){
            throw error;
        }
    }
}

module.exports = AlmacenService