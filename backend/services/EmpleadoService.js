const EmpleadoDAO = require('../dao/EmpleadoDAO');

const EmpleadoService = {

    async createEmpleado(idAreaTrabajo, nombre, telefono, dni){
        try{
            if(!idAreaTrabajo) throw {status: 400, message: "idAreaTrabajo requerido para crear empleado"};
            if(!nombre) throw {status: 400, message: "nombre requerido para crear empleado"};
            if(!telefono) throw {status: 400, message: "telefono requerido para crear empleado"};
            if(!dni) throw {status: 400, message: "dni requerido para crear empleado"};

            return await EmpleadoDAO.createEmpleado(
            idAreaTrabajo,
            nombre,
            telefono,
            dni
            );
        } catch(error){
            throw error;
        }
    },

    async getByDni(dni){
        try{
            if(!dni)    
                throw {status: 400, message: "dni requerido para buscar empleado"};
            return await EmpleadoDAO.getByDni(dni);
        } catch(error){
            throw error;
        }
    },

    async getEmpleados(nomArea){
        try{
            if(!nomArea) throw {status: 400, message: "nombre de area requerido para buscar empleados"};

            const AreaTrabajoService = require('./AreaTrabajoService');
            const {idArea} = await AreaTrabajoService.getAreaTrabajoByNombre(nomArea);

            if(!idArea) throw {status: 404, message: "No se encontró el area de trabajo"};

            return await EmpleadoDAO.getEmpleados(idArea);
        } catch(error){
            console.error("Error al obtener empleados", error);
            throw error;
        }
    }
}

module.exports = EmpleadoService;