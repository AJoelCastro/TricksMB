const db = require('../config/db');

class ModeloDAO{
    static async getAllModelo(){
        try{
            const query = 'SELECT * FROM Modelo';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            console.error("Error al obtener modelos:", error);
            throw error;
        }
    }

    static async getModeloByNombre(){
        try{
            const query = 'SELECT * FROM Modelo WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error("Error al obtener modelo por ID:", error);
            throw error;
        }
    }
}

module.exports = ModeloDAO;