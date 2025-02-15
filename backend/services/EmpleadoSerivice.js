const EmpleadoDAO = reuire('../dao/EmpleadoDAO');

const EmpleadoService = {
    async getByDni(dni){
        try{
            const empleado = await EmpleadoDA.getByDni(dni);
            if(!empleado){
                return res.status(404).json({ error: "Empleado no encontrado" });
            }
            return empleado;
        } catch(error){
            throw error;
        }
    }
}

module.exports = EmpleadoService;