const CaracteristicasService = require('../services/CaracteristicasService');

const CaracteristicasController = {
    async createCaracteristica(req, res) {
        try {
            let { idDetallePedido, talla, cantidad, color } = req.body;

            
            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) return res.status(400).json({ error: `El campo ${nombreCampo} debe ser un número` });
                return numero;
            };

            
            talla = convertirNumero(talla, "talla");
            cantidad = convertirNumero(cantidad, "cantidad");
            
            const caracteristica = await CaracteristicasService.createCaracteristicas(
                idDetallePedido,
                talla,
                cantidad,
                color
            );
            res.json({ message: "Caracteristica creada con éxito", caracteristica, status: 200 });
        } catch (error) {
            console.error("Error al crear caracteristica:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status  });
        }
    },

    async getCaracteristicas(req, res) {
        try {
            const {idDetallePedido} = req.params;
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);
            res.json({caracteristicas, status: 200});
        } catch (error) {
            console.error("Error al obtener caracteristicas:", error);
            return res.json({ error: error.message || "Error interno del servidor", status: error.status });
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
            res.json({message: "Caracteristica actualizada con éxito", caracteristica, status: 200});
        } catch (error) {
            console.error("Error al actualizar caracteristicas:", error);
            res.json({ error: error.message || "Error interno del servidor" , status: error.status });
        }
    },

    async deleteCaracteristicas(req, res) {
        try {
            const { idCaracteristicas } = req.params;
            const result = await CaracteristicasService.deleteCaracteristicas(idCaracteristicas);
            res.json({message: "Caracteristica eliminada con éxito", result, status: 200});
        } catch (error) {
            console.error("Error al eliminar caracteristicas:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },

    async getCaracteristica(req, res) {
        try {
            const {idCaracteristicas} = req.params;
            const caracteristica = await CaracteristicasService.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
            res.json({caracteristica, status: 200});
        } catch (error) {
            console.error("Error al obtener caracteristica:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },
}

module.exports = CaracteristicasController;
