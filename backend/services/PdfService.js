const PDFDocument = require("pdfkit");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const fs = require("fs");
const TOKEN_DE_BOT = process.env.TOKEN_DE_BOT;
const ID_CHAT = process.env.ID_CHAT;
const bot = new TelegramBot(TOKEN_DE_BOT, { polling: false });
const PdfService = {
    async generatePDF(cajas) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            let x = 50; // Coordenada X inicial
            let y = 50; // Coordenada Y inicial
            const colWidth = 120; // Ancho de la columna
            const rowHeight = 140; // Espacio entre filas
            const maxHeight = doc.page.height - 50; // Altura máxima de la página antes de cambiar

            cajas.forEach((caja, index) => {
                try {
                    const base64Data = caja.qrImage.replace(/^data:image\/png;base64,/, '');
                    const imageBuffer = Buffer.from(base64Data, 'base64');

                    // Si no hay espacio para la siguiente fila
                    if (y + rowHeight > maxHeight) {
                        x += colWidth; // Moverse a la siguiente columna
                        y = 50; // Reiniciar Y en la parte superior

                        // Si no hay más espacio en X, crear una nueva página
                        if (x + colWidth > doc.page.width - 50) {
                            doc.addPage(); // Nueva página
                            x = 50; // Reiniciar X
                            y = 50; // Reiniciar Y
                        }
                    }

                    // Agrega texto arriba del código QR
                    doc.text(`Caja ${caja.idCaja}:`, x, y);
                    
                    // Agrega el código QR debajo del texto
                    doc.image(imageBuffer, x, y + 15, { width: 120, height: 120 });

                    // Ajusta la posición para la siguiente caja
                    y += rowHeight;

                } catch (error) {
                    console.error(`Error al agregar el QR de la caja ${caja.idCaja}:`, error);
                    reject(error);
                }
            });

            doc.end();
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
        console.error("❌ Error al enviar el PDF por Telegram:", error);
    }
}



}

module.exports = PdfService;
