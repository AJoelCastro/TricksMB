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
    
    async getAllClientes() {
        return await ClienteDAO.getAllClientes();
    },

    async getCliente(value){
        if(value.length === 8){
            const cliente =await ClienteDAO.getClienteNaturalByDni(value);
            return cliente;
        }else if(value.length == 11){
            return await ClienteDAO.getClienteJuridicoByRuc(value);
        }
        throw{status:500, message:`Cliente encontrado`};
    },

    async getClienteByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw {status: 400, message: "Código de pedido requerido"};
            return await ClienteDAO.getClienteByCodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    }
};

module.exports = ClienteService;
