const db = require('../config/db');

class AreaTrabajoDAO{
    
    static async getbyNombre(nombre){
        try{
            const query =  'SELECT * FROM Area_trabajo WHERE Nombre = ?';
            const rows = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error('Error al buscar area de trabajo por nombre. ', error);
            throw error;
        }
    }
}

module.exports = AreaTrabajoDAO;