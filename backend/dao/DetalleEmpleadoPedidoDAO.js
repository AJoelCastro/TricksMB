const db = require('../config/db');

class DetalleEmpleadoPedidoDAO{
    static async createDetalleEmpleadoPedido(idEmpleado, idPedido){
        try{
            const query = 'INSERT INTO Detalle_empleado_pedido (Empleado_idEmpleado, Pedido_idPedido) VALUES (?, ?)';
            const [rows] = await db.execute(query, [idEmpleado, idPedido]);
            return {id: rows.insertId, idEmpleado, idPedido};
        } catch(error){
            throw error;
        }
    }
}
module.exports = DetalleEmpleadoPedidoDAO;