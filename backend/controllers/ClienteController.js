const ClienteService = require('../services/ClienteService');

const ClienteController = {
    async registrarCliente(req, res) {
        try {
            const { tipoCliente, nombre, dni, razonSocial, ruc, representanteLegal, telefono } = req.body;

            const nuevoCliente = await ClienteService.createCliente(tipoCliente);

            if (tipoCliente === "natural") {
                await ClienteService.createClienteNatural(nuevoCliente.idCliente, nombre, dni, telefono);
            } else if (tipoCliente === "juridico") {
                await ClienteService.createClienteJuridico(nuevoCliente.idCliente, razonSocial, ruc, representanteLegal, telefono);
            }else if (tipoCliente === null) {
                return res.status(400).json({ error: "Debe proporcionar el tipo de cliente" });
            }
            return res.status(201).json({ message: "Cliente registrado con éxito", nuevoCliente });
        } catch (error) {
            return res.status(500).json({ error: "Error al registrar el cliente" });
        }
    },
    
    async buscarCliente(req, res) {
        try {
            const { tipoCliente, identificador } = req.body; // `identificador` será el DNI o RUC

            if (!tipoCliente || !identificador) {
                return res.status(400).json({ error: "Debe proporcionar tipo de cliente y DNI o RUC" });
            }

            let cliente;
            if (tipoCliente === "natural") {
                cliente = await ClienteService.getClienteNaturalByDni(identificador);
            } else if (tipoCliente === "juridico") {
                cliente = await ClienteService.getClienteJuridicoByRuc(identificador);
            } else {
                return res.status(400).json({ error: "Tipo de cliente inválido" });
            }

            return res.json(cliente);
        } catch (error) {
            console.error("Error al buscar cliente:", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async obtenerClientes(req, res) {
        try {
            const clientes = await ClienteService.getAllClientes();
            return res.json(clientes);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener clientes" });
        }
    }
}

module.exports = ClienteController;
