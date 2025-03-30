const db = require('../config/db');

class AlmacenDAO {

    static async createAlmacen (nombre, imagen, direccion){
        try{
            const query = `INSERT INTO Almacen (Nombre, Imagen, Direccion) VALUE (?, ?, ?)`;
            const [result] = await db.execute(query, [nombre, imagen, direccion]);
            if(result.affectedRows === 0){
                throw new Error("No se pudo crear el Almace")
            }
            return { message: result.insertId, nombre, imagen,  direccion};
        }catch(error){
            console.error("Error al crear el tipo de almacen", error);
            throw error;
        }
    }

    static async getAlmacen(nombre){
        try{
            const [result] = await db.execute(`SELECT * FROM Almacen WHERE Nombre = ?`,[nombre])
            if(result.affectedRows === 0){
                throw new Error("No se pudo obtner el almacen");
            }
            return result[0];
        }catch(error){
            console.error("Error al obtner el tipo de almacen", error);
            throw error;
        }
    }

    static async updateStock(idAlmacen, cantidad){
        try{
            const [result] = await db.execute(`UPDATE Almacen SET Stock = ? WHERE idAlmacen = ?`,
                [cantidad, idAlmacen])

            if (result.affectedRows === 0) {
                throw new Error("No se encontró el almacén o el stock ya tenía el mismo valor.");
            }

            if (result.changedRows === 0) {
                throw new Error("El stock ya tenía el mismo valor. No se realizaron cambios.");
            }

            return {message:"Se actualizo el stock del almacen"}
        }catch(error){
            console.error("Error al actualiza el stock", error);
            throw error;
        }
    }
}

module.exports = AlmacenDAO