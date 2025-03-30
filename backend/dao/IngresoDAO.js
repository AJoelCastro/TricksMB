const db = require('../config/db')

class IngresoDAO{
    static async createIngreso(idCaja, idDetalleAlmacen){
        try{
            const [result] = await db.execute(`INSERT INTO Ingreso (Caja_idCaja, Detalle_almacen_idDetalle_almacen)
                VALUES (?, ?)`[idCaja, idDetalleAlmacen]);
            if(result.affectedRows === 0){
                throw new Error("No se pudo crear el Ingreso de la caja")
            }

            return {message:"Caja Ingresa con exito"}
        }catch(error){
            console.log("Error al crear la caja", error);
            throw error;
        }
    }

}

module.exports = IngresoDAO