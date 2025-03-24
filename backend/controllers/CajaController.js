const CajaService = require('../services/CajaService');
const PDFDocument = require('pdfkit'); // Para generar el PDF
const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            const pdfBuffer = await generatePDF(result.cajas);
            console.log("✅ PDF generado:", pdfBuffer);
            // Guardar el PDF localmente
            fs.writeFileSync(pdfPath, pdfBuffer); // Guarda el PDF en el sistema de archivos

            res.json({ message: "Cajas creadas y PDF enviado por correo.", cajas: result.cajas, status:200 });
        } catch (error) {
            console.error("Error en CajaController.createCaja:", error);
            res.status(error.status || 500).send(error.message);
        }
    },

    async getAllCajaByPedido(req, res) {
        try {
            const { codigoPedido } = req.params;
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const cajas = await CajaService.getAllCajaByPedido(codigoPedido);
            res.status(200).send(cajas);
        } catch (error) {
            console.error("Error en CajaController.getAllCajaByPedido:", error);
            res.status(error.status || 500).send(error.message);
        }
    }
};

async function generatePDF(cajas) {
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
    
}

module.exports = CajaController;