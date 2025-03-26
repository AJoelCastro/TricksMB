const CajaDAO = require("../dao/CajaDAO");
const PdfService = require("./PdfService");
const db = require("../config/db");


const CajaService = {
    async createCaja(codigoPedido) {
        const DetallePedido = require("./DetallePedidoService");
        const Caracteristica = require("./CaracteristicasService");
        try {

            // Obtener detalle del pedido
            const { idDetalle_pedido } = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(idDetalle_pedido);

            if (caracteristicas.length === 0) throw { status: 400, message: "No se encontraron características" };

            const cajas = [];
            for (const caracteristica of caracteristicas) {
                for (let i = 0; i < caracteristica.Cantidad; i++) {
                    const caja = await CajaDAO.createCaja(caracteristica.idCaracteristicas);
                    if(!caja){
                        const error = new Error("Error al crear la caja  en cs");
                        error.status = 400;
                        throw error;
                    }
                    cajas.push(caja);
                }
            }

            const pdfBuffer = await PdfService.generatePDF(cajas);
            await PdfService.sendPDFToTelegram(pdfBuffer, `Cajas_Pedido_${codigoPedido}.pdf`);

            return {status: 200, message: "Cajas creadas y PDF enviado por correo."};
        } catch (error) {
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
    },

    async updateCaja(idCaja){
        try{
            if(!idCaja) throw {status: 400, message: "Falta el id de la caja"};
            return await CajaDAO.updateCaja(idCaja);
        }catch(error){
            console.error("Error al actualizar caja:", error);
            throw error;
        }
    },

    async getCajaById(idCaja) {
        
        const CaracteristicasService = require("./CaracteristicasService");
        const DetallePedidoService = require("./DetallePedidoService");
        const ModeloService = require("./ModeloService");
        const TipoCalzadoService = require("./TipoCalzadoService");
        const imagenService = require("./ImagenService");
        idCaja = parseInt(idCaja.id, 10);
        try {
            if (!idCaja || typeof idCaja !== "number") throw { status: 400, message: "ID de caja inválido" };
            const caja = await CajaDAO.getCajaById(idCaja);

            if (!caja) throw { status: 404, message: "Caja no encontrada" };
            
            const caracteristica = await  CaracteristicasService.getCaracteristicaByIdCaracteristicas(
                caja.Caracteristicas_idCaracteristicas);

            const detallePedido = await DetallePedidoService.getDetallePedidoByidDetallePedido(
                caracteristica.Detalle_pedido_idDetalle_pedido);

            if (!caracteristica || !detallePedido) throw { status: 404, message: "Datos incompletos" };

            const modelo = await ModeloService.getModeloById(detallePedido.Modelo_idModelo);
            const imagen = await imagenService.getImagen(detallePedido.Modelo_idModelo);
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(detallePedido.Codigo_pedido);

            return {
                codigoPedido: detallePedido.Codigo_pedido,
                modelo: modelo.Nombre,
                tipoCalzado: tipoCalzado.Nombre,
                imagenUrl: imagen[0].Url,
                talla: caracteristica.Talla,
                color: caracteristica.Color,
                fechaCreacion: new Date(caja.Fecha_creacion).toLocaleTimeString('es-ES', { hour12: false })
            };

        } catch (error) {
            console.error("Error al obtener caja por id:", error);
            throw error;
        }
}

}; 

module.exports = CajaService;