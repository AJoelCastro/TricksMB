const AreaTrabajoDAO = require('../dao/AreaTrabajoDAO');

const AreaTrabajoService = {

    async getAreaTrabajobyNombre(nombre){
        try{
            if(!nombre) throw {status: 400, message: "Parametros incorrectos incorrecto"};
            const areaTrabajo = await AreaTrabajoDAO.getbyNombre(nombre);
            if(!areaTrabajo)
                throw {status: 404,message:"Area de trabajo no encontrado"};
            return areaTrabajo;
        } catch(error){
            throw error;
        }
    }
}

module.exports = AreaTrabajoService;