const db = require('../config/db');

class DetalleAlmacenDAO{
    static async createDetalleAlmacen(idAlmacen, idDetallePedido, ) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Detalle_almacen (Almacen_idAlmacen, Detalle_pedido_idDetalle_pedido,) VALUES (?, ?)`, 
                [idTipoAlmacen, idInventario]
            );
            
            if (result.affectedRows === 0) {
                throw new Error("No se pudo crear el Detalle del Almacén.");
            }

            return { message: "Detalle almacén creado exitosamente", insertId: result.insertId };
        } catch (error) {
            console.error("Error en crear el detalle almacén:", error);
            throw error;
        }
    }

    static async getDetalleAlmacen(idDetallePedido){
        try{
            const [result] = await db.execute(`SELECT * FROM Detalle_almacen 
                WHERE Detalle_pedido_idDetalle_pedido = ?`, [idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se a encontrado el detalle almacen.");
            }

            return result[0];
        }catch(error){
            console.error("Error al obtner el detalle almacén:", error);
            throw error;
        }
    }

    static async updateCantidadIngreso(idDetallePedido, cantidad) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Cantidad_Ingreso = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [cantidad, idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar la cantidad de ingreso.");
            }

            return { message: "Cantidad de ingreso actualizada exitosamente" };
        } catch (error) {
            console.error("Error al actualizar la cantidad de ingreso:", error);
            throw error;
        }
    }

    static async updateCantidadSalida(idDetallePedido, cantidad) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Cantidad_Salida = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [cantidad, idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar la cantidad de salida.");
            }

            return { message: "Cantidad de salida actualizada exitosamente" };
        } catch (error) {
            console.error("Error al actualizar la cantidad de salida:", error);
            throw error;
        }
    }

    static async updateEstado(idDetallePedido, estado) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Estado = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [estado, idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar el estado.");
            }

            return { message: "Estado actualizado exitosamente" };
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            throw error;
        }
    }
}

module.exports = DetalleAlmacenDAO;