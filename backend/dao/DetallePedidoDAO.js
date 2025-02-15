const db = require('../config/db');

class DetallePedidoDAO {
    static async createDetallePedido(idPedido, idProducto,codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorios, forro) {
        try {
            if (!idPedido || !idProducto) {
                throw new Error("idPedido e idProducto son obligatorios");
            }
            if (cantidad <= 0) {
                throw new Error("Cantidad debe ser mayor a 0");
            }
            const query = `
                INSERT INTO Detalle_pedido (
                    Pedido_idPedido, Producto_idProducto, Codigo_pedido, Color, Talla, Cantidad,
                    Nombre_taco, Altura_taco, Material, Tipo_material, Suela, Accesorios, Forro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.execute(query, [
                idPedido, idProducto, codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro
            ]);

            return {
                idDetallePedido: result.insertId, // Retorna el ID del nuevo registro
                idPedido, idProducto, codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
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
            return rows;
        } catch (error) {
            console.error("Error al obtener detalle de pedido por código de pedido:", error);
            throw error;
        }
    }
}

module.exports = DetallePedidoDAO;
