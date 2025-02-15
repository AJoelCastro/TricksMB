const db = require('../config/db')

class DetalleAreaTrabajoDAO{

    static async crearDetalleAreaTrabajo(idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario){
        try{
            const query = `
                INSERT INTO Detalle_area_trabajo (
                    Area_Trabajo_idArea_trabajo, Detalle_pedido_idDetalle_pedido, Cantidad_avance, Comentario
                ) VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [
                idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario
            ]);

            return {
                idDetalleAreaTrabajo: result.insertId,
                idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario
            };
        }catch(error){
            throw error;   
        }
    }
}
module.exports = DetalleAreaTrabajoDAO;