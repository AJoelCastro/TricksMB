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
        if (!dni) throw new Error('DNI es requerido');
        const clienteNatural = await ClienteDAO.getClienteNaturalByDni(dni);
        if (!clienteNatural) throw new Error('Cliente natural no encontrado');
        return clienteNatural;
    },

    async getClienteJuridicoByRuc(ruc) {
        if (!ruc) throw new Error('RUC es requerido');
        const clienteJuridico = await ClienteDAO.getClienteJuridicoByRuc(ruc);
        if (!clienteJuridico) throw new Error('Cliente jurídico no encontrado');
        return clienteJuridico;
    },

    async getAllClientes() {
        return await ClienteDAO.getAllClientes();
    },
};

module.exports = ClienteService;
