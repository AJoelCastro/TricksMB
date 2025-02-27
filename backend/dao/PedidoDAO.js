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

    static async getPedidoByCodigoPedido(codigoPedido){
        try {
            const queryGetidPedido = 'SELECT Pedido_idPedido FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(queryGetidPedido, [codigoPedido]);
            
            if (rows.length === 0) {
                throw new Error("No se encontró el pedido con el código proporcionado.");
            }
            const idPedido = rows[0].Pedido_idPedido;

            const query = 'SELECT * FROM Pedido WHERE idPedido = ?';
            const [result] = await db.execute(query, [idPedido]);

            if (result.length === 0) {
                throw new Error("No se encontró un pedido con el código proporcionado.");
            }

            return result[0];
        } catch (error) {
            console.error("Error al obtener detalle de pedido por código de pedido:", error);
            throw error;
        }
    }

    static async updatePedido(codigoPedido,fechaEntrega, serieInicio, serieFinal){
        try {
            const queryGetPedido = `SELECT Pedido_idPedido FROM Detalle_pedido WHERE Codigo_pedido = ?`;
            const [rows] = await db.execute(queryGetPedido, [codigoPedido]);

            if (rows.length === 0) {
                throw new Error("No se encontró el pedido con el código proporcionado.");
            }
            const idPedido = rows[0].Pedido_idPedido;

            const queryUpdatePedido = `
            UPDATE Pedido 
            SET Fecha_entrega = ?, Serie_inicio = ?, Serie_final = ?
            WHERE idPedido = ?`;

            await db.execute(queryUpdatePedido, [fechaEntrega, serieInicio, serieFinal, idPedido]);

            return { mensaje: "Pedido actualizado correctamente", codigoPedido, fechaEntrega, serieInicio, serieFinal };

        }catch (error) {
            console.error("Error al actualizar pedido:", error);
            throw error;
        }
    }
}

module.exports = PedidoDAO;