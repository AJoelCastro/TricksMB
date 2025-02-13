const db = require('../config/db');

class TipoCalzadoDAO{
    static async getAllTipoCalzado(){
        try{
            const query = 'SELECT * FROM Tipo_calzado';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            console.error("Error al obtener tipos de calzado:", error);
            throw error;
        }
    }

    static async getTipoCalzadoByNombred(nombre){
        try{
            const query = 'SELECT * FROM Tipo_calzado WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error("Error al obtener tipo de calzado por ID:", error);
            throw error;
        }
    }
}

module.exports = TipoCalzadoDAO;