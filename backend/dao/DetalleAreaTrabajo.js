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

    static async getDetalleAreaTrabajo(idCaracteristicas){
        try{
            const query = `
                SELECT * FROM Detalle_area_trabajo WHERE Caracteristica_idCaracteristicas = ?
            `;
            const [rows] = await db.execute(query, [idCaracteristicas]);
            return rows;
        }catch(error){
            throw error;
        }
    }

    static async updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario,estado){
        try{
            const query = `
                UPDATE Detalle_area_trabajo SET
                    Cantidad_avance = ?, Comentario = ?, Estado = ?
                WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [result] = await db.execute(query, [cantidadAvance, comentario, estado, idCaracteristicas]);
            if(result.affectedRows === 0){
                throw new Error("No se encontró el detalle de área de trabajo con el id de caracteristicas proporcionado");
            }
        }
        catch(error){
            throw error;
        }
    }
}
module.exports = DetalleAreaTrabajoDAO;