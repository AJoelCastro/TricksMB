const AreaTrabajoService = require('../services/AreaTrabajoService');

const AreaTrabajoController = {
    async createAreaTrabajo(req, res){
        try{
            const {nombre} = req.body;
            const areaTrabajo = await AreaTrabajoService.createAreaTrabajo(nombre);
            res.status(201).send(areaTrabajo);
        } catch(error){
            console.error(error);
            res.status(500).send({message: "Error al crear area de trabajo"});  
        }
    },

    async getAreaTrabajobyNombre(req, res){
        try{
            const {nombre} = req.params;
            const areaTrabajo = await AreaTrabajoService.getAreaTrabajoByNombre(nombre);
            res.status(200).send(areaTrabajo);
        } catch(error){
            console.error(error);
            res.status(500).send({message: "Error al buscar area de trabajo por nombre"});
        }
    }

};

module.exports = AreaTrabajoController;