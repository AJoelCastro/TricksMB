const db = require('../config/db');

class EmpleadoDAO{

    static async createEmpleado(idAreaTrabajo, idUsuario, nombres, telefono){
        try{
            const query = 'INSERT INTO Empleado (Area_Trabajo_idArea_trabajo, Usuario_idUsuario, Nombres, Telefono) VALUES (?, ?, ?, ?,)';
            const [result] = await db.execute(query,[idAreaTrabajo, idUsuario, nombres, telefono]);
            return {idEmpleado: result.insertId,idAreaTrabajo, idUsuario, nombres, telefono};
        } catch(error){
            console.error("Error al crear empleado:", error);
            throw error;
        }
    }

    static async getById(idUsuario){
        try{
            const query = 'SELECT * FROM Empleado WHERE Usuario_idUsuario = (?)';
            const [rows] =  await db.execute(query, [idUsuario]);
            return rows[0];
        } catch(error){
            console.error('Error al buscar empleado pos ID:', error);
            throw error;
        }
    }
}

module.exports = EmpleadoDAO;