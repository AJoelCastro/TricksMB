const CajaService = require('../services/CajaService');
const PDFDocument = require('pdfkit'); // Para generar el PDF
const fs = require('fs');
const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const result = await CajaService.createCaja(codigoPedido);
            const pdfBuffer = await generatePDF(result.cajas);
            console.log("✅ PDF generado:", pdfBuffer);
            // Guardar el PDF localmente
            const pdfPath = `./cajas_${codigoPedido}.pdf`; // Ruta donde se guardará el PDF
            fs.writeFileSync(pdfPath, pdfBuffer); // Guarda el PDF en el sistema de archivos

            console.log("✅ PDF generado y guardado en:", pdfPath);
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

// Función para generar el PDF
async function generatePDF(cajas) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();

        // Crear un buffer para almacenar el PDF
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        // Agregar los códigos QR al PDF
        cajas.forEach((caja, index) => {
            try {
                // Extrae la parte base64 de la cadena (elimina el prefijo)
                const base64Data = caja.qrImage.replace(/^data:image\/png;base64,/, '');

                // Decodifica la cadena base64 a un Buffer
                const imageBuffer = Buffer.from(base64Data, 'base64');

                // Agrega la imagen al PDF
                doc.text(`Caja ${caja.idCaja}:`);
                doc.image(imageBuffer, { width: 200, height: 200 });
                doc.moveDown();
            } catch (error) {
                console.error(`Error al agregar el QR de la caja ${caja.idCaja}:`, error);
                reject(error);
            }
        });

        doc.end();
    });
}

module.exports = CajaController;