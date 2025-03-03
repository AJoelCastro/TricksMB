const AreaTrabajoService = require('../services/AreaTrabajoService');

const AreaTrabajoController = {
    async createAreaTrabajo(req, res){
        try{
            const {nombre} = req.body;
            const areaTrabajo = await AreaTrabajoService.createAreaTrabajo(nombre);
            res.status(201).send(areaTrabajo);
        } catch(error){
            res.status(error.status).send(error.message);
        }
    },

    async getAreaTrabajobyNombre(req, res){
        try{
            const {nombre} = req.params;
            const areaTrabajo = await AreaTrabajoService.getAreaTrabajoByNombre(nombre);
            res.status(200).send(areaTrabajo);
        } catch(error){
            res.status(error.status).send(error.message);
        }
    }

};

module.export = AreaTrabajoController;