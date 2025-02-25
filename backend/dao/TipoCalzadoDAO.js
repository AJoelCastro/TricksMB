const db = require('../config/db');

class TipoCalzadoDAO{
    static async getAllTipoCalzado(){
        try{
            const query = 'SELECT * FROM Tipo';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            console.error("Error al obtener tipos de calzado:", error);
            throw error;
        }
    }

    static async getTipoCalzadoByNombre(nombre){
        try{
            const query = 'SELECT * FROM Tipo WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error("Error al obtener tipo de calzado por ID:", error);
            throw error;
        }
    }

    async getTipoCalzadoByCodigoPedido(codigoPedido) {
        try {
            const query = `
                SELECT t.Nombre 
                FROM Detalle_pedido dp
                JOIN Modelo m ON dp.Modelo_idModelo = m.idModelo
                JOIN Tipo t ON m.Tipo_idTipo = t.idTipo
                WHERE dp.Codigo_pedido = ?`;

            const [rows] = await db.execute(query, [codigoPedido]);

            if (rows.length === 0) {
                throw new Error("No se encontró el tipo de calzado con el código proporcionado.");
            }

            return rows[0]; // Devuelve el objeto con el nombre del tipo de calzado
        } catch (error) {
            console.error("Error al obtener tipo de calzado por código de pedido:", error);
            throw error;
        }
    }
    
}

module.exports = TipoCalzadoDAO;