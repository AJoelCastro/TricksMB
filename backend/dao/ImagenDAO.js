const db = require('../config/db');

class ImagenDAO {

    static async getImagen(idModelo){
        try{
            const query = `SELECT * FROM Imagen WHERE Modelo_idModelo = ?`;
            const [rows] = await db.execute(query,[idModelo]);
            return rows;
        } catch(error){
            throw error
        }
    }
}

module.exports = ImagenDAO