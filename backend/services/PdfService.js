const PDFDocument = require("pdfkit");
const { Readable } = require("stream");

const PdfService = {
    async  createPDF(cajas) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        doc.fontSize(20).text("Códigos QR de las Cajas", { align: "center" });
        doc.moveDown();

        cajas.forEach((caja) => {
            doc.text(`ID Caja: ${caja.idCaja}`);
            doc.image(caja.qrImage, { width: 200 });
            doc.moveDown();
        });

        doc.end();
        });
    }
    
}

module.exports = PdfService;
