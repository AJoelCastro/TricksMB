const db = require('../config/db');

class DetallePedidoDAO {
    static async createDetallePedido(idPedido, idModelo,codigoPedido, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorios, forro) {
        try {
            const query = `
                INSERT INTO Detalle_pedido (
                    Pedido_idPedido, Modelo_idModelo, Codigo_pedido,
                    Nombre_taco, Altura_taco, Material, Tipo_material, Suela, Accesorios, Forro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.execute(query, [
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro
            ]);

            return {
                idDetallePedido: result.insertId, // Retorna el ID del nuevo registro
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro
            };

        } catch (error) {
            console.error("Error al crear detalle de pedido:", error);
            throw error;
        }
    }

    static async getDetallePedidoBycodigoPedido(codigoPedido) {
        try {
            const query = 'SELECT * FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(query, [codigoPedido]);
            return rows[0];
        } catch (error) {
            console.error("Error al obtener detalle de pedido por código de pedido:", error);
            throw error;
        }
    }
}

module.exports = DetallePedidoDAO;
