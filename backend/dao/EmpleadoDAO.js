const db = require('../config/db');

class EmpleadoDAO{

    static async getByDni(Dni){
        try{
            const query = 'SELECT * FROM Empleado WHERE Dni = (?)';
            const [rows] =  await db.execute(query, [Dni]);
            return rows[0];
        } catch(error){
            console.error('Error al buscar empleado pos Dni:', error);
            throw error;
        }
    }
}

module.exports = EmpleadoDAO;