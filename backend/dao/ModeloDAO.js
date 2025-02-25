const db = require('../config/db');

class ModeloDAO{
    static async getAllModelo(){
        try{
            const query = 'SELECT * FROM Modelo';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            throw error;
        }
    }

    static async getModeloByNombre(nombre){
        try{
            const query = 'SELECT * FROM Modelo WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            throw error;
        }
    }
    static async getAllModeloById(id){
        try{
            const query = 'SELECT * FROM Modelo WHERE Tipo_idTipo = ?';
            const [rows] = await db.execute(query, [id]);
            return rows;
        }catch(error){
            throw error;
        }
    }

    static async getModeloByCodigoPedido(codigoPedido){
        try{
            const query = 'SELECT Modelo_idModelo FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(query, [codigoPedido]);
            
            if (rows.length === 0) {
                throw new Error("No se encontró el modelo con el código proporcionado.");
            }

            const idModelo = rows[0].Modelo_idModelo;

            const queryModelo = 'SELECT * FROM Modelo WHERE idModelo = ?';
            const [result] = await db.execute(queryModelo, [idModelo]);

            if (result.length === 0) {
                throw new Error("No se encontró un modelo con el código proporcionado.");
            }

            return result[0];
        }catch(error){
            throw error;
        }
    }
}

module.exports = ModeloDAO;