const db = require('../config/db')

class DetalleAreaTrabajoDAO{

    static async crearDetalleAreaTrabajo(idAreaTrabajo,idCaracteristicas, cantidadAvance, comentario, estado){
        try{
            const query = `
                INSERT INTO Detalle_area_trabajo (
                    Area_Trabajo_idArea_trabajo, Caracteristicas_idCaracteristicas, Cantidad_avance, Comentario, Estado
                ) VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario, estado]);
            return{idDetalleAreaTrabajo: result.insertId, idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario, estado};
        }catch(error){
            throw error;   
        }
    }

    static async updateDetalleAreaTrbajo(idCaracteristicas, cantidadAvance, comentario,estado){

    }
}
module.exports = DetalleAreaTrabajoDAO;