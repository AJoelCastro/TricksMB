const ClienteService = require('../services/ClienteService');

const ClienteController = {
    async registrarCliente(req, res, next) {
        try {
            const { tipoCliente, nombre, dni, razonSocial, ruc, representanteLegal, telefono } = req.body;

            const clienteNatural = dni ? await ClienteService.getClienteNaturalByDni(dni) : null;
            const clienteJuridicoRuc = ruc ? await ClienteService.getClienteJuridicoByRuc(ruc) : null;
            const clienteJuridicoRazonSocial = razonSocial ? await ClienteService.getClienteJuridicoByRazonSocial(razonSocial) : null;
            
            const nuevoCliente = await ClienteService.createCliente(tipoCliente);
            
            if (tipoCliente === "natural") {
                await ClienteService.createClienteNatural(nuevoCliente.idCliente, nombre, dni, telefono);
            } else if (tipoCliente === "juridico") {
                await ClienteService.createClienteJuridico(nuevoCliente.idCliente, razonSocial, ruc, representanteLegal, telefono);
            }

            res.json({nuevoCliente, status: 201 });
        } catch (error) {
            next(error);
        }
    },
    
    async buscarClienteNatural(req, res, next) {
        try {
            const { tipoCliente, identificador } = req.query;

            if (tipoCliente === "natural") {
                const cliente = await ClienteService.getClienteNaturalByDni(identificador);
                res.json({ cliente, status: 200 });
            } 
        } catch (error) {
            next(error);
        }
    },

    async buscarClienteJuridico(req, res, next) {
        try {
            const { tipoCliente, identificador } = req.query;

            if (tipoCliente === "juridico") {
                const cliente = await ClienteService.getClienteJuridicoByRuc(identificador);
                res.json({ cliente, status: 200 });
            }
        } catch (error) {
            next(error);
        }
    },

    async getAllClientes(req, res, next) {
        try {
            const clientes = await ClienteService.getAllClientes();
            res.json({ clientes, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getClienteByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const cliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
            res.json({ cliente, status: 200 });
        } catch (error) {
            next(error);
        }
    },
    
    async getClientesById(req, res, next) {
        try {
            const cliente = await ClienteService.getClientesById();
            res.status(200).json({ cliente });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ClienteController;
