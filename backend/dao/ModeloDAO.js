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
}

module.exports = ModeloDAO;