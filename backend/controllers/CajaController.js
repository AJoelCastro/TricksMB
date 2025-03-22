const CajaService = require('../services/CajaService');
const PDFDocument = require('pdfkit'); // Para generar el PDF
const nodemailer = require('nodemailer'); // Para enviar el correo
const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            if (!codigoPedido) {
                throw { status: 400, message: "El código de pedido es requerido" };
            }
            const result = await CajaService.createCaja(codigoPedido);
            const pdfBuffer = await generatePDF(result.cajas);
            // Enviar el PDF por correo
            await sendEmailWithPDF(pdfBuffer);
            res.status(200).json({ message: "Cajas creadas y PDF enviado por correo.", cajas: result.cajas });
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
            doc.text(`Caja ${index + 1}:`);
            doc.image(Buffer.from(caja.qr, 'base64'), { width: 200, height: 200 });
            doc.moveDown();
        });

        doc.end();
    });
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'tucorreo@gmail.com', // Tu correo Gmail
        clientId: 'TU_CLIENT_ID', // Puedes dejarlo vacío si usas OAuth Playground
        clientSecret: 'TU_CLIENT_SECRET', // Puedes dejarlo vacío si usas OAuth Playground
        refreshToken: '1//04EjMVAJF9giuCgYIARAAGAQSNwF-L9Irza5PStbtp5nWvD4qZGeu5fPJOHqoG_t89kBR8J7gbx8xFaFzkmm4DtPD9cvD3-191SQ', // Token de actualización de OAuth Playground
        accessToken: 'ya29.a0AeXRPp5w3mRiBpOJzW2kLlQ-bOcFXGZsYL-g_o_qziMpioTm1TIbooehJDdsAQu_hWi5pe81prIXbcTGjyZ1230TL9cs2dS01dtOKnjj8ccv0DotUFB28zi2XHhNZNK8Sw5jTizbXt9oklw_lzk-BefdIL65FNVk83HYg-dNaCgYKAXUSARISFQHGX2MiLixBbqpeTHLsb5CEyVN4wQ0175' // Token de acceso de OAuth Playground
    }
});
// Función para enviar el correo con el PDF adjunto
async function sendEmailWithPDF(pdfBuffer) {

    const mailOptions = {
        from: 'tucorreo@gmail.com', // Remitente
        to: 'destinatario@gmail.com', // Destinatario
        subject: 'Códigos QR de las Cajas', // Asunto del correo
        text: 'Adjunto encontrarás los códigos QR de las cajas.', // Cuerpo del correo
        attachments: [
            {
                filename: 'codigos_qr.pdf', // Nombre del archivo adjunto
                content: pdfBuffer // Buffer del PDF
            }
        ]
    };

    await transporter.sendMail(mailOptions);
}

module.exports = CajaController;