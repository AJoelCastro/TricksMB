const db = require('../config/db');

class ProductoDAO{
    static async createProducto(idModelo){
        try{
            const query = 'INSERT INTO Producto (Modelo_idModelo) VALUES (?)';
            const [result] = await db.execute(query, [idModelo]);
            return {idProducto: result.insertId, idModelo};
        } catch (error){
            console.error("Error al crear producto:", error);
            throw error;
        }
    }   
}

module.exports = ProductoDAO;