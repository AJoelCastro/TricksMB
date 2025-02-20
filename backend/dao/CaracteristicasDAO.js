const db = require('../config/db');
const PedidoService = require('../services/PedidoService');

class CaracteristicasDAO {

    static async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            const query = 'INSERT INTO Caracteristicas (DetallePedido_idDetallePedido, Talla, Cantidad, Color) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [idDetallePedido, talla, cantidad, color]);
            return { idCaracteristicas: result.insertId, idDetallePedido, talla, cantidad, color };
        }catch(error){
            throw error;
        }
    }

    static async getCaracteristicasByIdDetallePedido(idDetallePedido){
        try{
            const query = 'SELECT * FROM Caracteristicas WHERE DetallePedido_idDetallePedido = ?';
            const [result] = await db.execute(query, [idDetallePedido]);
            return result;
        }catch(error){
            throw error;
        }
    }
}

module.exports = CaracteristicasDAO;