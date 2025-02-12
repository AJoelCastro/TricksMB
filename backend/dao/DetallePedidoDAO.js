const db = require('../config/db');

class DetallePedidoDAO {
    static async createDetallePedido(idPedido, idProducto,codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorio, forro) {
        try {
            if (!idPedido || !idProducto) {
                throw new Error("idPedido e idProducto son obligatorios");
            }
            if (cantidad <= 0) {
                throw new Error("Cantidad debe ser mayor a 0");
            }
            const query = `
                INSERT INTO Detalle_pedido (
                    Pedido_idPedido, Producto_idProducto, Codigo_pedido,Color, Talla, Cantidad,
                    Nombre_taco, Altura_taco, Material, Tipo_material, Suela, Accesorio, Forro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [result] = await db.execute(query, [
                idPedido, idProducto, codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorio, forro
            ]);

            return {
                idDetallePedido: result.insertId, // Retorna el ID del nuevo registro
                idPedido, idProducto, codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorio, forro
            };

        } catch (error) {
            console.error("Error al crear detalle de pedido:", error);
            throw error;
        }
    }
}

module.exports = DetallePedidoDAO;
