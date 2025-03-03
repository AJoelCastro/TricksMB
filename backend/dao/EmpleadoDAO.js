const db = require('../config/db');

class EmpleadoDAO{
    static async createEmpleado(idAreaTrabajo, Nombre, Telefono, Dni){
        try{
            const query = 'INSERT INTO Empleado (idAreaTrabajo, Nombre, Telefono, Dni) VALUES (?, ?, ?, ?)';
            const [rows] = await db.execute(query, [idAreaTrabajo, Nombre, Telefono, Dni]);
            return rows;
        } catch(error){
            throw error;
        }
    }

    static async getByDni(Dni){
        try{
            const query = 'SELECT * FROM Empleado WHERE Dni = (?)';
            const [rows] =  await db.execute(query, [Dni]);
            return rows[0];
        } catch(error){
            throw error;
        }
    }
}

module.exports = EmpleadoDAO;