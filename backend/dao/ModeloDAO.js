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
}

module.exports = ModeloDAO;