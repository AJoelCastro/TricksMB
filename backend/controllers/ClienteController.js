const ClienteService = require('../services/ClienteService');

const ClienteController = {
    async registrarCliente(req, res) {
        try {
            const { tipoCliente, nombre, dni, razonSocial, ruc, representanteLegal, telefono } = req.body;

            // Validar que los datos no sean undefined o null antes de consultar
            const clienteNatural = dni ? await ClienteService.getClienteNaturalByDni(dni) : null;
            const clienteJuridicoRuc = ruc ? await ClienteService.getClienteJuridicoByRuc(ruc) : null;
            const clienteJuridicoRazonSocial = razonSocial ? await ClienteService.getClienteJuridicoByRazonSocial(razonSocial) : null;

            if (clienteNatural || clienteJuridicoRuc || clienteJuridicoRazonSocial) {
                return res.status(400).json({ error: "El cliente ya existe" });
            }

            if (!tipoCliente) {
                return res.status(400).json({ error: "Debe proporcionar el tipo de cliente" });
            }
            
            const nuevoCliente = await ClienteService.createCliente(tipoCliente);
            
            if (tipoCliente === "natural") {
                await ClienteService.createClienteNatural(nuevoCliente.idCliente, nombre, dni, telefono);
            } else if (tipoCliente === "juridico") {
                await ClienteService.createClienteJuridico(nuevoCliente.idCliente, razonSocial, ruc, representanteLegal, telefono);
            }

            return res.status(201).json({ message: "Cliente registrado con éxito", nuevoCliente });
        } catch (error) {
            return res.status(500).json({ error: "Error al registrar el cliente" });
        }
    },
    
    async buscarClienteNatural(req, res) {
        try {
            const { tipoCliente, identificador } = req.query; // `identificador` será el DNI o RUC

            if (!tipoCliente || !identificador) {
                return res.status(400).json({ error: "Debe proporcionar tipo de cliente y DNI o RUC" });
            }

            let cliente;
            if (tipoCliente === "natural") {
                cliente = await ClienteService.getClienteNaturalByDni(identificador);
                
            } else {
                return res.status(400).json({ error: "Tipo de cliente inválido" });
            }

            return res.json(cliente);
        } catch (error) {
            console.error("Error al buscar cliente:", error);
            return res.status(500).json({ error: error.message });
        }
    },
    async buscarClienteJuridico(req, res) {
        try {
            const { tipoCliente, identificador } = req.query; // `identificador` será el DNI o RUC

            if (!tipoCliente || !identificador) {
                return res.status(400).json({ error: "Debe proporcionar tipo de cliente y DNI o RUC" });
            }

            let cliente;
            if (tipoCliente === "juridico") {
                cliente = await ClienteService.getClienteJuridicoByRuc(identificador);
                console.log("cliente controller",cliente)
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
    },

    async getClienteByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const cliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
            return res.status(200).json(cliente);
        } catch (error) {
            console.error("Error al obtener cliente por código de pedido:", error);
            return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
        }
    }
    
}

module.exports = ClienteController;
