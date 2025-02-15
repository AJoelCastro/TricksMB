const EmpleadoDAO = reuire('../dao/EmpleadoDAO');

const EmpleadoService = {
    async getByDni(dni){
        try{
            if(!dni)    
                throw {status: 400, message: "dni requerido para buscar empleado"};
            return await EmpleadoDAO.getByDni(dni);
        } catch(error){
            throw error;
        }
    }
}

module.exports = EmpleadoService;