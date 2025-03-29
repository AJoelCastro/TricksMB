const ClienteDAO = require('../dao/ClienteDAO');

const ClienteService = {
    async createCliente(tipoCliente) {
        if (!tipoCliente) throw new Error('Tipo de cliente es requerido');
        return await ClienteDAO.createCliente(tipoCliente);
    },

    async createClienteNatural(idCliente, nombre, dni, telefono) {
        if (!idCliente || !nombre || !dni || !telefono) throw new Error('Todos los campos son requeridos');
        return await ClienteDAO.createClienteNatural(idCliente, nombre, dni, telefono);
    },

    async createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono) {
        if (!idCliente || !razonSocial || !ruc || !representanteLegal || !telefono) throw new Error('Todos los campos son requeridos');
        return await ClienteDAO.createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono);
    },

        async getClienteNaturalByDni(dni) {
        if (!dni) return null; // Si DNI no está definido, devuelve null
        const clienteNatural = await ClienteDAO.getClienteNaturalByDni(dni);
        return clienteNatural || null; // Si no hay resultados, devuelve null en lugar de lanzar error
    },

    async getClienteJuridicoByRuc(ruc) {
        if (!ruc) return null;
        const clienteJuridico = await ClienteDAO.getClienteJuridicoByRuc(ruc);
        return clienteJuridico || null;
    },

    async getClienteJuridicoByRazonSocial(razonSocial) {
        if (!razonSocial) return null;
        const clienteJuridico = await ClienteDAO.getClienteJuridicoByRazonSocial(razonSocial);
        return clienteJuridico || null;
    },

    async getCliente(value){
        try{
            if(value.length === 8){
                return await ClienteDAO.getClienteNaturalByDni(value); 
            }else if(value.length == 11){
                return await ClienteDAO.getClienteJuridicoByRuc(value);
            }
        }catch(error){
            throw error.status ? error : {status:500, message:`Error en el servicio al buscar cliente`};
        }
    },

    async getClienteByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw {status: 400, message: "Código de pedido requerido"};
            return await ClienteDAO.getClienteByCodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    },

    async getAllClientes(){
        try{
            const clientes = await ClienteDAO.getAllClientes();
            if(!clientes) throw {status: 404, message: "No se encontraron clientes"};
            return clientes;
        }catch(error){
            throw error;
        }
    },

    async getClientesById(){
        try{
            const clientes = await ClienteDAO.getClientesById();
            if(clientes.length === 0) {
                const errorClientes = new Error("No se encontró el cliente");
                errorClientes.status = 404;
                throw errorClientes;
            }

            const clientesFiltrados = clientes.map(cliente => {
            return Object.fromEntries(
                Object.entries(cliente).filter(([_, value]) => value !== null)
            );
        });

            return clientesFiltrados;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error al obtener clientes por id"};
        }
    }
};

module.exports = ClienteService;
