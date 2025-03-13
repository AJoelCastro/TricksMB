const db = require('../config/db');

class DetalleEmpleadoPedidoDAO{
    static async createDetalleEmpleadoPedido(idEmpleado, idPedido){
        try{
            const query = 'INSERT INTO Detalle_empleadoPedido (Empleado_idEmpleado, Pedido_idPedido) VALUES (?, ?)';
            const [rows] = await db.execute(query, [idEmpleado, idPedido]);
            return {id: rows.insertId, idEmpleado, idPedido};
        } catch(error){
            throw error;
        }
    }

    static async getAllDetallePedido(idArea, idDetalle_pedido){
        try{
            const query = `SELECT * FROM Detalle_empleadoPedido WHERE Empleado_idEmpleado IN (SELECT idEmpleado FROM 
            Empleado WHERE Area_trabajo_idArea_trabajo = ?) AND Detalle_pedido_idDetalle_pedido = ?`;
            const [rows] = await db.execute(query, [idArea, idDetalle_pedido]);
            return rows;
        } catch(error){
            throw error;
        }
    }
}
module.exports = DetalleEmpleadoPedidoDAO;