const { json } = require("body-parser");
const EmpleadoService = require("../services/EmpleadoService");

const EmpleadoController = {
    async createEmpleado(req, res){
        try{
            const {idAreaTrabajo, nombre, telefono, dni} = req.body;
            const empleado = await EmpleadoService.createEmpleado(idAreaTrabajo, nombre, telefono, dni);
            if(!empleado){
                res.json({ success: false, message: "Error al registrar empleado", status: error.status });
            }
            res.json({ success: true, message: "Empleado registrado exitosamente", empleado, status: 201 });
        } catch(error){
            console.error(error);
            res.json({ success: false, message: "Error al registrar empleado", status: error.status });
        }
    },

    async getByDni(req, res){
        try{
            const {dni} = req.params;
            const empleado = await EmpleadoService.getByDni(dni);
            res.json({empleado, status: 200});
        } catch(error){
            res.json({ success: false, message: "Error al buscar empleado por DNI", status: error.status });
        }
    },

    async getEmpleados(req, res){
        try{
            const {nomArea} = req.query;
            const empleados = await EmpleadoService.getEmpleados(nomArea);
            res.json({empleados, status: 200});
        }catch(error){
            res.json({ success: false, message: "Error al obtener empleados", status: error.status });
        }
    }
};

module.exports = EmpleadoController;