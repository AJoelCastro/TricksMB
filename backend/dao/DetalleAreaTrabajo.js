const db = require('../config/db')

class DetalleAreaTrabajoDAO{

    static async crearDetalleAreaTrabajo(idAreaTrabajo,idCaracteristicas, cantidadAvance, comentario){
        try{
            const query = `
                INSERT INTO Detalle_area_trabajo (
                    Area_Trabajo_idArea_trabajo, Caracteristicas_idCaracteristicas, Cantidad_avance, Comentario
                ) VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario]);
            return{idDetalleAreaTrabajo: result.insertId, idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario};
        }catch(error){
            throw error;   
        }
    }
}
module.exports = DetalleAreaTrabajoDAO;