const AreaTrabajoService = require('../services/AreaTrabajoService');

const AreaTrabajoController = {
    async createAreaTrabajo(req, res){
        try{
            const {nombre} = req.body;
            const areaTrabajo = await AreaTrabajoService.createAreaTrabajo(nombre);
            res.send({areaTrabajo, status:200});
        } catch(error){
            console.error(error);
            res.send({message: "Error al crear area de trabajo", status: error.status });
        }
    },

    async getAreaTrabajobyNombre(req, res){
        try{
            const {nombre} = req.params;
            const areaTrabajo = await AreaTrabajoService.getAreaTrabajoByNombre(nombre);
            res.send({areaTrabajo, status:200});
        } catch(error){
            console.error(error);
            res.send({message: "Error al buscar area de trabajo por nombre", status: error.status });
        }
    }

};

module.exports = AreaTrabajoController;