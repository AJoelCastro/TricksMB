const EmpleadoService = require("../services/EmpleadoService");

const EmpleadoController = {
    async createEmpleado(req, res){
        try{
            const {idAreaTrabajo, nombre, telefono, dni} = req.body;
            const empleado = await EmpleadoService.createEmpleado(idAreaTrabajo, nombre, telefono, dni);
            if(!empleado){
                return res.status(400).json({ success: false, message: "Error al crear empleado" });
            }
            res.status(201).json({ success: true, message: "Empleado registrado exitosamente", empleado });
        } catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: "Error al registrar empleado" });
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
    },

    async getEmpleados(req, res){
        try{
            const dataEmpleado = req.params;
            console.log(dataEmpleado);
            const empleados = await EmpleadoService.getEmpleados(dataEmpleado.nomArea);
            res.status(200).send(empleados);
        }catch(error){
            res.status(error.status).send(error.message);
        }
    }
};

module.exports = EmpleadoController;