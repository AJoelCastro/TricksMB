const db = require('../config/db');

class ClienteDAO {
    // Crear un cliente base
    static async createCliente(tipoCliente) {
        try {
            const query = 'INSERT INTO cliente (Tipo_cliente) VALUES (?)';
            const [result] = await db.execute(query, [tipoCliente]);
            return { idCliente: result.insertId, tipoCliente };
        } catch (error) {
            console.error("Error al crear cliente:", error);
            throw error;
        }
    }

    // Crear cliente natural
    static async createClienteNatural(idCliente, nombre, dni, telefono) {
        try {
            const query = 'INSERT INTO cliente_natural (idCliente, Nombre, DNI, Telefono) VALUES (?, ?, ?, ?)';
            await db.execute(query, [idCliente, nombre, dni, telefono]);
            return { idCliente, nombre, dni, telefono };
        } catch (error) {
            console.error("Error al crear cliente natural:", error);
            throw error;
        }
    }

    // Crear cliente jurídico
    static async createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono) {
        try {
            const query = 'INSERT INTO cliente_juridico (idCliente, Razon_social, RUC, Representante_legal, Telefono) VALUES (?, ?, ?, ?, ?)';
            await db.execute(query, [idCliente, razonSocial, ruc, representanteLegal, telefono]);
            return { idCliente, razonSocial, ruc, representanteLegal, telefono };
        } catch (error) {
            console.error("Error al crear cliente jurídico:", error);
            throw error;
        }
    }

    // Buscar cliente natural por DNI
    static async getClienteNaturalByDni(dni) {
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, cn.Nombre, cn.DNI, cn.Telefono
                FROM cliente_natural cn
                INNER JOIN cliente c ON cn.idCliente = c.idCliente
                WHERE cn.DNI = ?`;
            const [rows] = await db.execute(query, [dni]);

            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error al buscar cliente natural por DNI:", error);
            throw error;
        }
    }

    // Buscar cliente jurídico por RUC
    static async getClienteJuridicoByRuc(ruc) {
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, cj.Razon_social, cj.RUC, cj.Representante_legal, cj.Telefono
                FROM cliente_juridico cj
                INNER JOIN cliente c ON cj.idCliente = c.idCliente
                WHERE cj.RUC = ?`;
            const [rows] = await db.execute(query, [ruc]);

            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error al buscar cliente jurídico por RUC:", error);
            throw error;
        }
    }

    // Obtener todos los clientes
    static async getAllClientes() {
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, 
                    cn.Nombre, cn.DNI, cn.Telefono, 
                    cj.Razon_social, cj.RUC, cj.Representante_legal, cj.Telefono AS TelefonoJuridico
                FROM cliente c
                LEFT JOIN cliente_natural cn ON c.idCliente = cn.idCliente
                LEFT JOIN cliente_juridico cj ON c.idCliente = cj.idCliente`;

            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error("Error al obtener todos los clientes:", error);
            throw error;
        }
    }
}

module.exports = ClienteDAO;
