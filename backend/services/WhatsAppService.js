const twilio = require("twilio");
const cloudinary = require("../config/cloudinary");

require("dotenv").config();

const client = twilio(process.env.TU_ACCOUNT_SID, process.env.TU_AUTH_TOKEN);
const whatsappNumber = "whatsapp:+51901528082";

const WhatsAppService = {
    async sendPDFtoWhatsApp(pdfBuffer) {
        try {
            // 🔹 Subir PDF a Cloudinary
            const uploadResponse = await cloudinary.uploader.upload_stream(
                { resource_type: "raw", folder: "pdfs" },
                async (error, result) => {
                    if (error) {
                        console.error("❌ Error al subir PDF a Cloudinary:", error);
                        throw error;
                    }

                    console.log("✅ PDF subido a Cloudinary:", result.secure_url);

                    // 🔹 Enviar el PDF por WhatsApp con Twilio
                    const message = await client.messages.create({
                        from: "whatsapp:+19302057051",
                        to: whatsappNumber,
                        body: "📦 Aquí están los códigos QR de las cajas:",
                        mediaUrl: [result.secure_url], // URL pública del PDF
                    });

                    console.log("✅ PDF enviado por WhatsApp:", message.sid);
                }
            );

            uploadResponse.end(pdfBuffer); // Envía el buffer al stream de Cloudinary
        } catch (error) {
            console.error("❌ Error al enviar PDF a WhatsApp:", error);
        }
    }
};

module.exports = WhatsAppService;
