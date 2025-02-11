const db = require(.../config/db)

class DetalleAreaTrabajoDAO{

    static async crearDetalleAreaTrabajo(idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario, fechaActualizacion){
        try{
            if (!idAreaTrabajo || !Detalle_pedido_idDetalle_pedido){
                throw new Error("idAreaTrabajo y Detalle_pedido_idDetalle_pedido son obligatorios");
            }
            if (cantidadAvance <= 0){
                throw new Error("Cantidad de avance debe ser mayor a 0");
            }

            const query = `
                INSERT INTO Detalle_area_trabajo (
                    Area_Trabajo_idArea_trabajo, Detalle_pedido_idDetalle_pedido, Cantidad_avance, Comentario, Fecha_actualizacion
                ) VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [
                idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario, fechaActualizacion
            ]);

            return {
                idDetalleAreaTrabajo: result.insertId,
                idAreaTrabajo, Detalle_pedido_idDetalle_pedido, cantidadAvance, comentario, fechaActualizacion
            };
        }catch(error){
            console.error("Error al crear detalle de area de trabajo:", error);
            throw error;   
        }
    }
}
module.exports = DetalleAreaTrabajoDAO;