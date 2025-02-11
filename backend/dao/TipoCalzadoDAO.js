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
}

module.exports = TipoCalzadoDAO;