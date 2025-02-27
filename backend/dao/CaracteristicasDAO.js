const db = require('../config/db');
const PedidoService = require('../services/PedidoService');

class CaracteristicasDAO {

    static async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            const query = 'INSERT INTO Caracteristicas (Detalle_pedido_idDetalle_pedido, Talla, Cantidad, Color) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [idDetallePedido, talla, cantidad, color]);
            return { idCaracteristicas: result.insertId, idDetallePedido, talla, cantidad, color };
        }catch(error){
            throw error;
        }
    }

    static async getCaracteristicasByIdDetallePedido(idDetallePedido){
        try{
            const query = 'SELECT * FROM Caracteristicas WHERE Detalle_pedido_idDetalle_pedido = ?';
            const [result] = await db.execute(query, [idDetallePedido]);
            console.log(result);
            return result;
        }catch(error){
            throw error;
        }
    }

    static async updateCaracteristicas(codigoPeido,idCaracteristicas, talla, cantidad, color){
        try{
            const queryGetCaracteristicas = 'SELECT idDetalle_pedido FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(queryGetCaracteristicas, [codigoPeido]);
            
            if (rows.length === 0) {
                throw new Error("No se encontró la el detalle pedido.");
            }

            const idDetallePedido = rows[0].idDetallePedido;

            const query = `UPDATE Caracteristicas SET Talla = ?, Cantidad = ?, Color = ?
            WHERE Detalle_pedido_idDetalle_pedido = ? AND idCaracteristicas = ?`;
            
            const [result] = await db.execute(query, [talla, cantidad, color, idDetallePedido,idCaracteristicas]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontró la caracteristica con el id proporcionado.");
            }

            return { message: "Características actualizadas correctamente." };
        }catch(error){
            throw error;
        }
    }
}

module.exports = CaracteristicasDAO;