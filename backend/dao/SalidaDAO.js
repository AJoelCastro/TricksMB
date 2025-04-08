const db = require('../config/db');

class SalidaDAO {
  static async createSalida(idDetalleAlmacen, idCaja, idGuiSalida) {
    try {
      const query =
        "INSERT INTO Salida (Detalle_almacen_idDetalle_almacen, Caja_idCaja, Guia_salida_idGuia_salida) VALUES (?, ?, ?)";
      const [result] = await db.execute(query, [idDetalleAlmacen,idCaja,idGuiSalida]);
      if (result.length === 0) {
        const errorRows = new Error("Salida no creada");
        errorRows.status = 404;
        throw errorRows;
      }
      return {idSalida: result.insertId,idAmacen,idCaja,idGuiSalida};
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear salida" };
    }
  }
}

module.exports = SalidaDAO;
