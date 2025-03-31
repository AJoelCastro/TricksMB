const IngresoDAO = require('../dao/IngresoDAO');

const IngresoService = {
    
    async createIngreso(idCaja, codigoPedido)  {
        const DetalleAlmacenService = require("./DetalleAlmacenService");
        const CajaService = require("./CajaService");
        try{
            if(!idCaja || !codigoPedido){
                const erroridCajaCodigo = new Error("Parametros incorrectos");
                erroridCajaCodigo.status = 400;
                throw erroridCajaCodigo;
            }
            
            await CajaService.getCajaById(idCaja);

            const {idDetalle_almacen} = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            return await IngresoDAO.createIngreso(idCaja, idDetalle_almacen);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    }
}

module.exports = IngresoService