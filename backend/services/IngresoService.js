const IngresoDAO = require('../dao/IngresoDAO');

const IngresoService = {
    
    async createIngreso(idCaja, codigoPedido)  {
        const DetalleAlmacenService = require("./DetalleAlmacenService");
        const CajaService = require("./CajaService");
        try{
            if(!idCaja || !codigoPedido) throw new Error("Parametros incorrectos");
            
            const caja = await CajaService.getCajaById(idCaja);
            if(!caja) throw new Error("Caja no encontrada");

            const {idDetalle_almacen} = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            return await IngresoDAO.createIngreso(idCaja, idDetalle_almacen);
        }catch(error){
            throw error
        }
    }
}

module.exports = IngresoService