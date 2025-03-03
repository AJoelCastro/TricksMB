const EmpleadoService = require("../services/EmpleadoService");

const EmpleadoController = {
    async createEmpleado(req, res){
        try{
            const {idAreaTrabajo, nombre, telefono, dni} = req.body;
            const empleado = await EmpleadoService.createEmpleado(idAreaTrabajo, nombre, telefono, dni);
            res.status(201).json({ success: true, message: "Empleado registrado exitosamente", userId: empleado.idEmpleado });
        } catch(error){
            res.status(error.status).send(error.message);
        }
    },

    async getByDni(req, res){
        try{
            const {dni} = req.params;
            const empleado = await EmpleadoService.getByDni(dni);
            res.status(200).send(empleado);
        } catch(error){
            res.status(error.status).send(error.message);
        }
    }
};

module.exports = EmpleadoController;