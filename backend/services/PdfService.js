const PDFDocument = require("pdfkit");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const fs = require("fs");
const TOKEN_DE_BOT = process.env.TOKEN_DE_BOT;
const ID_CHAT = process.env.ID_CHAT;
const bot = new TelegramBot(TOKEN_DE_BOT, { polling: false });
const CaracteristicasService = require("./CaracteristicasService");
const DetallPedidoService = require("./DetallePedidoService");
const ModeloService = require("./ModeloService");
const ImagenService = require("./ImagenService");
const TipoCalzadoService = require("./TipoCalzadoService");


const PdfService = {
    async generatePDF(cajas) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const buffers = [];
    
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
    
                let x = 50;
                let y = 50;
                const colWidth = 120;
                const rowHeight = 140;
                const maxHeight = doc.page.height - 50;
    
                (async () => {
                    try {
                        for (const caja of cajas) {
                            const base64Data = caja.qrImage.replace(/^data:image\/png;base64,/, '');
                            const imageBuffer = Buffer.from(base64Data, 'base64');
    
                            const caracteristica= await CaracteristicasService.getCaracteristicaByIdCaracteristicas(caja.idCaracteristica);
                            const detallePedido= await DetallPedidoService.getDetallePedidoByidDetallePedido(caracteristica.Detalle_pedido_idDetalle_pedido);
                            const modelo= await ModeloService.getModeloById(detallePedido.Modelo_idModelo);
                            const tipoCalzado= await TipoCalzadoService.getTipoCalzadoByCodigoPedido(detallePedido.Codigo_pedido);
                            if (y + rowHeight > maxHeight) {
                                x += colWidth;
                                y = 50;
    
                                if (x + colWidth > doc.page.width - 50) {
                                    doc.addPage();
                                    x = 50;
                                    y = 50;
                                }
                            }
    
                            doc.image(imageBuffer, x, y + 15, { width: 120, height: 120 });
                            doc.text(`Código del pedido: ${detallePedido.Codigo_pedido}`, x, y);
                            doc.text(`Caja ${caja.idCaja}:`, x, y + 15);
                            doc.text(`Tipo de calzado: ${tipoCalzado.Nombre}`, x, y + 30);
                            doc.text(`Modelo: ${modelo.Nombre}`, x, y + 45);
                            doc.text(`Talla: ${caracteristica.Talla}`, x, y + 60);
                            doc.text(`Color: ${caracteristica.Color}`, x, y + 75);
    
                            y += rowHeight;
                        }
                    } catch (error) {
                        const errorPdf = new Error("Error al generar el PDF");
                        errorPdf.status = 500;
                        reject(errorPdf);
                    }
                })();
                doc.end();
            } catch (error) {
                const errorPdf2 = new Error("Error general en la generación del PDF");
                errorPdf2.status = 500;
                reject(errorPdf2);
            }
        });
    },
    

    async sendPDFToTelegram(pdfBuffer, fileName) {
    try {
        const tempFilePath = `./${fileName}`;
        fs.writeFileSync(tempFilePath, pdfBuffer);

        await bot.sendDocument(ID_CHAT, fs.createReadStream(tempFilePath), {
            caption: "Aquí tienes el PDF generado."
        });

        console.log("📄 PDF enviado con éxito por Telegram.");
        fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal después de enviarlo
    } catch (error) {
        fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal después de enviarlo
        throw error.status? error: {status: 500, message: "❌ Error al enviar el PDF por Telegram"};
    }
}



}

module.exports = PdfService;
