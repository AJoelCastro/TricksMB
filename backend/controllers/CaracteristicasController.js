const { get } = require('../routes/PedidoRoutes');
const CaracteristicasService = require('../services/CaracteristicasService');

const CaracteristicasController = {
    async createCaracteristica(req, res) {
        try {
            const {idDetallePedido, talla, cantidad, color } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) throw { status: 400, message: `${nombreCampo} debe ser un número válido` };
                return numero;
            };

            talla = convertirNumero(talla, "talla");
            cantidad = convertirNumero(cantidad, "cantidad");

            const caracteristica = await CaracteristicasService.createCaracteristicas(idDetallePedido, talla, cantidad, color);
            return res.status(201).json({ message: "Caracteristica creada con éxito", caracteristica });
        } catch (error) {
            console.error("Error al crear caracteristica:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getCaracteristicas(req, res) {
        try {
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido();
            return res.status(200).json(caracteristicas);
        } catch (error) {
            console.error("Error al obtener caracteristicas:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }

}

module.exports = CaracteristicasController;
