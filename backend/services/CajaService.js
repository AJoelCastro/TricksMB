const CajaDAO = require("../dao/CajaDAO");
const DetallePedido = require("./DetallePedidoService");
const Caracteristica = require("./CaracteristicasService");

const CajaService = {
    async createCaja(codigoPedido){
        const connection = await db.getConnection();
        try{          
            await connection.beginTransaction();

            const {DetallePedido_idDetallePedido} = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(DetallePedido_idDetallePedido);

            if(caracteristicas.length === 0) throw {status: 400, message: "No se encontraron caracteristicas"};
            for(const caracteristica of caracteristicas){
                for(let i = 0; i < caracteristica.cantidad; i++){
                    await CajaDAO.createCaja(caracteristica.idCaracteristicas);
                }
            }

            await connection.commit();
            connection.release();
            
            return {status: 200, message: "Cajas creadas"};
        }catch(error){
            await connection.rollback();
            connection.release();
            console.error("Error al crear cajas:", error);
            throw error;
        }
    },

    async getAllCajaByPedido(codigoPedido){
        try{
            const {DetallePedido_idDetallePedido} = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);
            if(!DetallePedido_idDetallePedido) throw {status: 404, message: "No se encontró el detalle de pedido"};

            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(DetallePedido_idDetallePedido);
            if(caracteristicas.length === 0) throw {status: 404, message: "No se encontraron caracteristicas"};
            
            const cajas = await Promise.all(caracteristicas.map(async (caracteristica) => {
                try {
                    return await CajaDAO.getAllCajaByPedido(caracteristica.idCaracteristicas);
                } catch (error) {
                    console.error(`Error obteniendo cajas para característica ${caracteristica.idCaracteristicas}:`, error);
                    return [];
                }
            }));

            return cajas.flat();
        }catch(error){
            console.error("Error al obtener cajas por pedido:", error);
            throw error;
        }
    }
}

module.exports = CajaService;