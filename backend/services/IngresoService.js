const IngresoDAO = require('../dao/IngresoDAO');

const IngresoService = {
    
    async createIngreso(idCaja, codigoPedido)  {
        const DetalleAlmacenService = require("./DetalleAlmacenService");
        try{
            if(!idCaja || !codigoPedido){
                const erroridCajaCodigo = new Error("Parametros incorrectos");
                erroridCajaCodigo.status = 400;
                throw erroridCajaCodigo;
            }
            const ingreso = await this.getIngresosByCaja(idCaja)
            
            if(ingreso){
                const erroridCaja = new Error("Caja ya ingresada");
                erroridCaja.status = 404;
                throw erroridCaja;
            }

            const {idDetalle_almacen} = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            return await IngresoDAO.createIngreso(idCaja, idDetalle_almacen);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    },

    async getIngresosBy(idCaja)  {
        try{
            if(!idCaja) {
                const erroridCaja = new Error("idCaja requerido");
                erroridCaja.status = 400;
                throw erroridCaja;
            }
            return await IngresoDAO.getIngresoByCaja(idCaja);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    },

    async getAllIngresosByDetalleAlmacen(idDetalleAlmacen){
        try{
            return await IngresoDAO.getAllIngresosByDetalleAlmacen(idDetalleAlmacen);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    }
}

module.exports = IngresoService