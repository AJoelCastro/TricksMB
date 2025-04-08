const db = require("config/db");

class SalidaDAO {
  static async createSalida(idAmacen, idCaja, idGuiSalida, fechaSalida) {
    try {
      const query =
        "INSERT INTO Salida (Almacen_idAlmacen, Caja_idCaja, Guia_salida_idGuia_salida, Fecha_salida) VALUES (?, ?, ?, ?)";
      const [result] = await db.execute(query, [
        idAmacen,
        idCaja,
        idGuiSalida,
        fechaSalida,
      ]);
      if (result.length === 0) {
        const errorRows = new Error("Salida no creada");
        errorRows.status = 404;
        throw errorRows;
      }
      return {
        idSalida: result.insertId,
        idAmacen,
        idCaja,
        idGuiSalida,
        fechaSalida,
      };
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear salida" };
    }
  }
}

module.exports = SalidaDAO;
