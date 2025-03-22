const CajaDAO = require("../dao/CajaDAO");
const db = require("../config/db");

const CajaService = {
    async createCaja(codigoPedido){
        const connection = await db.getConnection();
        try{          
            await connection.beginTransaction();
            const DetallePedido = require("./DetallePedidoService");
            const Caracteristica = require("./CaracteristicasService");
            const {idDetalle_pedido} = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);

            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(idDetalle_pedido);

            if(caracteristicas.length === 0) throw {status: 400, message: "No se encontraron caracteristicas"};
            const cajas = [];
            for(const caracteristica of caracteristicas){
                console.log("caracteristica:",caracteristica);
                for(let i = 0; i < caracteristica.Cantidad; i++){
                    const caja = await CajaDAO.createCaja(caracteristica.idCaracteristicas);
                    cajas.push(caja);
                }
            }
            if(cajas.length === 0) throw {status: 400, message: "No se crearon cajas"};

            await connection.commit();
            connection.release();

            return {status: 200, message: "Cajas creadas: ",cajas};
        }catch(error){
            await connection.rollback();
            connection.release();
            console.error("Error al crear cajas:", error);
            throw error;
        }
    },

    async getAllCajaByPedido(codigoPedido){
        try{
            const DetallePedido = require("./DetallePedidoService");
            const Caracteristica = require("./CaracteristicasService");

            const {idDetalle_pedido} = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);
            if(!idDetalle_pedido) throw {status: 404, message: "No se encontró el detalle de pedido"};

            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            if(caracteristicas.length === 0) throw {status: 404, message: "No se encontraron caracteristicas"};
            
            const cajas = await Promise.all(caracteristicas.map(async (caracteristica) => {
                try {
                    return await CajaDAO.getAllCajaByPedido(caracteristica.idCaracteristicas);
                } catch (error) {
                    console.error(`Error obteniendo cajas para característica ${caracteristica.idCaracteristicas}:`, error);
                    return [];
                }
            }));
            console.log("cajas:",cajas);
            return cajas.flat();
        }catch(error){
            console.error("Error al obtener cajas por pedido:", error);
            throw error;
        }
    }
}

module.exports = CajaService;