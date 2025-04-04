const AlmacenDAO = require('../dao/AlmacenDAO');

const AlmacenService = {
    async createAlmacen(nombre, imagen, Direccion){
        try{
            if(!nombre || !imagen || !Direccion) throw {status: 400, message: "Campos obligatorios"};
            return await AlmacenDAO.createAlmacen(nombre, imagen, Direccion);
        }catch(error){
            throw error
        }
    },

    async getAlmacen(nombre){
        try{
            if(!nombre) {
                const errorNombre = new Error("nombre de almacen requerido para obtener el almacen");
                errorNombre.status = 400;
                throw errorNombre;
            };
            return await AlmacenDAO.getAlmacen(nombre);
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en AlmacenService"};
        }
    },

    async getAllAlmacen(){
        try{
            const result = await AlmacenDAO.getAllAlmacen();
            
            if(result.length === 0){
                const errorAlmacen = new Error("No se encontraron almacenes");
                errorAlmacen.status = 404;
                throw errorAlmacen;
            }

            const datos = await Promise.all(result.map(async (almacen) => {
                return {
                    nombre: almacen.Nombre,
                    imagen: almacen.Imagen,
                    direccion: almacen.Direccion,
                    stock: almacen.Stock
                };
            }));
            
            return datos;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en AlmacenService"};
        }
    },

    async updateStock(idAlmacen, cantidad){
        try{
            if(!idAlmacen || !cantidad) {
                const errorParametros = new Error("Parametros incorrectos");
                errorParametros.status = 400;
                throw errorParametros;
            };
            
            const almacen = await AlmacenDAO.getAlmacen(idAlmacen);
            if(!almacen) {
                const errorAlmacen = new Error("Almacen no encontrado");
                errorAlmacen.status = 404;
                throw errorAlmacen;
            };
            if(cantidad <= 0) {
                const errorCantidad = new Error("Cantidad no valida");
                errorCantidad.status = 400;
                throw errorCantidad;
            };

            const stockActual = almacen.Stock;
            const nuevoStock = stockActual + cantidad;
            
            return await AlmacenDAO.updateStock(idAlmacen, nuevoStock);
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en AlmacenService"};
        }
    },
}

module.exports = AlmacenService