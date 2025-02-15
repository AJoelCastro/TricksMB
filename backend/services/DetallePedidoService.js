const DetallePedidoDAO = require('../dao/DetallePedidoDAO');

const DetallePedidoService = {
    async createDetallePedido(idPedido, idProducto, codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorio, forro) {
        try {
            if (!idPedido || !idProducto) {
                throw { status: 400, message: "idPedido e idProducto son obligatorios" };
            }

            talla = Number(talla);
            cantidad = Number(cantidad);
            alturaTaco = Number(alturaTaco);

            if (cantidad <= 0 || talla <= 0 || alturaTaco <= 0) {
                throw { status: 400, message: "Cantidad, talla o altura deben ser mayores a 0" };
            }

            if (!Number.isInteger(talla) || !Number.isInteger(cantidad) || !Number.isInteger(alturaTaco)) {
                throw { status: 400, message: "Talla, cantidad y altura de taco deben ser números enteros válidos" };
            }

            const detallePedido = await DetallePedidoDAO.createDetallePedido(
                idPedido, idProducto,codigoPedido, color, talla, cantidad, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorio, forro
            );

            if (!detallePedido) {
                throw { status: 500, message: "No se pudo registrar el detalle del pedido" };
            }

            return detallePedido;
        } catch (error) {
            if (error.status) throw error; // Si ya tiene status, lo relanzamos
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message };
        }
    },

    async getDetallePedidoBycodigoPedido(codigoPedido) {
        try {
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            return await DetallePedidoDAO.getDetallePedidoBycodigoPedido(codigoPedido);
        } catch (error) {
            if (error.status) throw error; // Si ya tiene status, lo relanzamos
            throw { status: 500, message: "Error en DetallePedidoService", detalle: error.message }
        }
    }
};

module.exports = DetallePedidoService;
