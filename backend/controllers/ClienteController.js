const ClienteService = require('../services/ClienteService');

const ClienteController = {
    async registrarCliente(req, res) {
        try {
            const { tipoCliente, nombre, dni, razonSocial, ruc, representanteLegal, telefono } = req.body;

            const clienteNatural = dni ? await ClienteService.getClienteNaturalByDni(dni) : null;
            const clienteJuridicoRuc = ruc ? await ClienteService.getClienteJuridicoByRuc(ruc) : null;
            const clienteJuridicoRazonSocial = razonSocial ? await ClienteService.getClienteJuridicoByRazonSocial(razonSocial) : null;

            if (clienteNatural || clienteJuridicoRuc || clienteJuridicoRazonSocial) {
                res.json({ error: "El cliente ya se encuentra registrado" , status: error.status });
            }

            if (!tipoCliente) {
                res.json({ error: "Debe proporcionar el tipo de cliente" , status: error.status });
            }
            
            const nuevoCliente = await ClienteService.createCliente(tipoCliente);
            
            if (tipoCliente === "natural") {
                await ClienteService.createClienteNatural(nuevoCliente.idCliente, nombre, dni, telefono);
            } else if (tipoCliente === "juridico") {
                await ClienteService.createClienteJuridico(nuevoCliente.idCliente, razonSocial, ruc, representanteLegal, telefono);
            }

            res.json({ message: "Cliente registrado con éxito", nuevoCliente, status: 201 });
        } catch (error) {
            res.json({ error: "Error al registrar el cliente", status: error.status  });
        }
    },
    
    async buscarClienteNatural(req, res) {
        try {
            const { tipoCliente, identificador } = req.query; // `identificador` será el DNI o RUC

            if (!tipoCliente || !identificador) {
                return res.json({ error: "Debe proporcionar tipo de cliente y DNI o RUC", status: 400  });
            }

            let cliente;
            if (tipoCliente === "natural") {
                cliente = await ClienteService.getClienteNaturalByDni(identificador);
                if(cliente===null){
                    return res.json({ error: "Cliente no encontrado o no existe", status: 404  });
                }
                return res.json({cliente, status: 201});
            } 
        } catch (error) {
            return res.json({ error: "Error interno del servidor", status: 500});
        }
    },
    async buscarClienteJuridico(req, res) {
        try {
            const { tipoCliente, identificador } = req.query; // `identificador` será el DNI o RUC

            if (!tipoCliente || !identificador) {
                return res.json({ error: "Debe proporcionar tipo de cliente y DNI o RUC", status: 400  });
            }

            let cliente;
            if (tipoCliente === "juridico") {
                cliente = await ClienteService.getClienteJuridicoByRuc(identificador);
                if(cliente===null){
                    return res.json({ error: "Cliente no encontrado o no existe", status: 404  });
                }
                return res.json({cliente, status: 201});
                
            }

        } catch (error) {
            return res.json({ error: "Error interno del servidor", status: 500});
        }
    },

    async getAllClientes(req, res) {
        try {
            const clientes = await ClienteService.getAllClientes();
        res.json({ clientes, status: 200 });
        } catch (error) {
            res.json({ error: "Error al obtener clientes", status: error.status });
        }
    },

    async getClienteByCodigoPedido(req, res) {
        try {
            const {codigoPedido} = req.params;
            const cliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
            res.json({cliente, status: 200});
        } catch (error) {
            console.error("Error al obtener cliente por código de pedido:", error);
            res.json({ error: error.message || "Error interno del servidor", status: error.status });
        }
    },
    
    async getClientesById(req, res) {
        try {
            const cliente = await ClienteService.getClientesById();
            res.json({ cliente, status: 200 });
        } catch (error) {
            res.json({ error: "Error al obtener el cliente", status: 500 });
        }
    }
}

module.exports = ClienteController;
