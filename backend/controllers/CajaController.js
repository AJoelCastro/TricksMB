const CajaService = require('../services/CajaService');

const CajaController = {
    async createCaja(req, res) {
        try {
            const { codigoPedido } = req.params;
            const result = await CajaService.createCaja(codigoPedido);
            res.json({ message: "Cajas creadas y PDF enviado por correo.", cajas: result.cajas, status:200 });
        } catch (error) {
            console.error("Error en CajaController.createCaja:", error);
            res.send({message: "Error al crear cajas", status: error.status });
        }
    },

    async getAllCajaByPedido(req, res) {
        try {
            const { codigoPedido } = req.params;
            const cajas = await CajaService.getAllCajaByPedido(codigoPedido);
            res.send({cajas, status:200});
        } catch (error) {
            console.error("Error en CajaController.getAllCajaByPedido:", error);
            res.send({message: "Error al obtener cajas por pedido", status: error.status });
        }
    },
    async updateCaja(req, res) {
        try{
            const { id } = req.params;
            const caja = await CajaService.updateCaja(id);
            res.send({caja, status:200});
        }catch(error){
            console.error("Error en CajaController.updateCaja:", error);
            res.send({message: "Error al actualizar caja", status: error.status });
        }
    },
    async getCajaById(req, res) {
        try{
            const data = req.params;
            console.log("id", data);
            const caja = await CajaService.getCajaById(data);
            console.log("caja", caja);
            res.send({caja, status:200});
        }catch(error){
            console.log("error aaaaaaa");
            console.error("Error en CajaController.getCajaById:", error);
            res.send({message: "Error al obtener caja por id", status: error.status });
        }
    }

    
};

module.exports = CajaController;