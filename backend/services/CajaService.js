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
    }
}

module.exports = CajaService;