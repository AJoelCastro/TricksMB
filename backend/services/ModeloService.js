const ModeloDAO = require('../dao/ModeloDAO');

const ModeloService = {

    async createModelo(idTipo, nombre){
        try{
            if (!idTipo) {
                const errorIdTipo = new Error("idTipo requerido");
                errorIdTipo.status = 400;
                throw errorIdTipo;
            };
            if(!nombre) {
                const errorNombre = new Error("Nombre requerido");
                errorNombre.status = 400;
                throw errorNombre;
            };
            return await ModeloDAO.createModelo(idTipo, nombre);
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en el servicio Modelo"};
        }
    },

    async getAllModelo(){
        try{
            return await ModeloDAO.getAllModelo();
        }catch(error){
            if(error.status) throw error;
            throw {status: 500, message: "Error en ModeloService", detalle: error.message};
        }
    },

    async getModeloByNombre(nombre){
        try{
            if(!nombre) {
                const errorNombre = new Error("Nombre requerido");
                errorNombre.status = 400;
                throw errorNombre;
            };
            return await ModeloDAO.getModeloByNombre(nombre);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error interno al buscar modelo por nombre"};
        }
    },

    async getAllModeloById(idTipo){
        try{
            if(!idTipo) {
                const errorIdTipo = new Error("idTipo requerido");
                errorIdTipo.status = 400;
                throw errorIdTipo;
            };
            return await ModeloDAO.getAllModeloById(idTipo);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error interno al buscar modelo por id"};
        }
    },

    async getModeloByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw {status: 400, message: "Código de pedido requerido"};
            return await ModeloDAO.getModeloByCodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    },
    //CambiarNombre
    async getModeloById(idModelo){
        try{
            if(!idModelo) throw {status: 400, message: "idModelo requerido"};
            return await ModeloDAO.getModeloById(idModelo);
        }catch(error){
            throw error;
        }
    },

    async inventarioPorAlmacen() {
    const DetalleAlmacenService = require("./DetalleAlmacenService");
    const AlmacenService = require("./AlmacenService");

    try {
        const modelos = await this.getAllModelo();
        const inventario = [];

        await Promise.all(modelos.map(async (modelo) => {
            const detallesAlmacen = await DetalleAlmacenService.getDetallesAlmacenByModelo(modelo.idModelo);

            for (const detalleAlm of detallesAlmacen) {
                const idAlmacen = detalleAlm.Almacen_idAlmacen;

                let registro = inventario.find(item =>
                    item.idModelo === modelo.idModelo && item.idAlmacen === idAlmacen
                );

                if (!registro) {
                    const almacen = await AlmacenService.getAlmacenById(idAlmacen);
                    registro = {
                        idModelo: modelo.idModelo,
                        nombreModelo: modelo.Nombre,
                        idAlmacen: almacen.Nombre,
                        cantidadIngreso: 0,
                        cantidadSalida: 0
                    };
                    inventario.push(registro);
                }

                registro.cantidadIngreso += detalleAlm.Cantidad_Ingreso;
                registro.cantidadSalida += detalleAlm.Cantidad_Salida;
            }
        }));

        inventario.forEach(item => {
            item.stockDisponible = item.cantidadIngreso - item.cantidadSalida;
        });

        return inventario;

    } catch (error) {
        throw error.status ? error : {status: 500, message: "Error en inventarioPorAlmacen", detalle: error.message};
    }
}


}

module.exports = ModeloService;