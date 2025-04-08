const db = require("../config/db");

class GuiaSalida {
  static async createGuiaSalida(idCliente, cantidad, fechaSalida) {
    try {
      const query =
        "INSERT INTO Guia_salida (Cliente_idCliente, Cantidad, Fecha_salida) VALUES (?, ?, ?)";
      const [result] = await db.execute(query, [
        idCliente,
        cantidad,
        fechaSalida,
      ]);
      if (result.length === 0) {
        const errorRows = new Error("Guia de salida no creada");
        errorRows.status = 404;
        throw errorRows;
      }
      return {
        idGuiaSalida: result.insertId,
        idCliente,
        cantidad,
        fechaSalida,
      };
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear guia de salida" };
    }
  }
}

module.exports = GuiaSalida;
