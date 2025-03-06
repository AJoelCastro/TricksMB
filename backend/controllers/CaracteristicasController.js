const CaracteristicasService = require('../services/CaracteristicasService');

const CaracteristicasController = {
    async createCaracteristica(req, res) {
        try {
            let { idDetallePedido, talla, cantidad, color } = req.body;

            // Función para convertir un valor a número y validarlo
            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) return res.status(400).json({ error: `El campo ${nombreCampo} debe ser un número` });
                return numero;
            };

            // Convertir y validar `talla` y `cantidad`
            talla = convertirNumero(talla, "talla");
            cantidad = convertirNumero(cantidad, "cantidad");
            // Llamar al servicio con los valores convertidos
            const caracteristica = await CaracteristicasService.createCaracteristicas(
                idDetallePedido,
                talla,
                cantidad,
                color
            );
            return res.status(201).json({ message: "Caracteristica creada con éxito", caracteristica });
        } catch (error) {
            console.error("Error al crear caracteristica:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getCaracteristicas(req, res) {
        try {
            const {idDetallePedido} = req.params;
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);
            return res.status(200).json(caracteristicas);
        } catch (error) {
            console.error("Error al obtener caracteristicas:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async editCaracteristicas(req, res) {
        try {
            const { idCaracteristicas, talla, cantidad, color } = req.body;
            const caracteristica = await CaracteristicasService.editCaracteristicas(
                idCaracteristicas,
                talla,
                cantidad,
                color
            );
            return res.status(200).json(caracteristica);
        } catch (error) {
            console.error("Error al actualizar caracteristicas:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async deleteCaracteristicas(req, res) {
        try {
            console.log(req.params)
            const { idCaracteristicas } = req.params;
            const result = await CaracteristicasService.deleteCaracteristicas(idCaracteristicas);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al eliminar caracteristicas:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },

    async getCaracteristica(req, res) {
        try {
            const {idCaracteristicas} = req.params;
            const caracteristica = await CaracteristicasService.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
            return res.status(200).json(caracteristica);
        } catch (error) {
            console.error("Error al obtener caracteristica:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    },
}

module.exports = CaracteristicasController;
