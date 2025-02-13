const db = require('../config/db');

class PedidoDAO {

    static async createPedido(idCliente, fechaEntrega, serieInicio, serieFin){
    try {
        const query = 'INSERT INTO Pedido (Cliente_idCliente, Fecha_entrega, Serie_inicio, Serie_final ) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [idCliente, fechaEntrega, serieInicio, serieFin]);
        return { idPedido: result.insertId, idCliente, fechaEntrega, serieInicio, serieFin };
    } catch (error) {
        console.error("Error al crear cliente:", error);
        throw error;
        }
    }
}