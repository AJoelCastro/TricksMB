const db = require('../config/db');

class ClienteDAO {
    // Crear un cliente base
    static async createCliente(tipoCliente) {
        try {
            if(!tipoCliente){
                throw new Error("Tipo de cliente es obligatorio");
            }
            const query = 'INSERT INTO Cliente (Tipo_cliente) VALUES (?)';
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
            const query = 'INSERT INTO Cliente_natural (Cliente_idCliente, Nombre, Dni, Telefono) VALUES (?, ?, ?, ?)';
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
            const query = 'INSERT INTO Cliente_juridico (Cliente_idCliente, Razon_social, Ruc, Representante_legal, Telefono) VALUES (?, ?, ?, ?, ?)';
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
                SELECT c.idCliente, c.Tipo_cliente, cn.Nombre, cn.Dni, cn.Telefono
                FROM Cliente_natural cn
                INNER JOIN Cliente c ON cn.Cliente_idCliente = c.idCliente
                WHERE cn.Dni = ?`;
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
                SELECT c.idCliente, c.Tipo_cliente, cj.Razon_social, cj.Ruc, cj.Representante_legal, cj.Telefono
                FROM Cliente_juridico cj
                INNER JOIN Cliente c ON cj.Cliente_idCliente = c.idCliente
                WHERE cj.Ruc = ?`;
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
                    cn.Nombre, cn.Dni, cn.Telefono AS TelefonoNatural, 
                    cj.Razon_social, cj.Ruc, cj.Representante_legal, cj.Telefono AS TelefonoJuridico
                FROM Cliente c
                LEFT JOIN Cliente_natural cn ON c.Cliente_idCliente = cn.idCliente
                LEFT JOIN Cliente_juridico cj ON c.Cliente_idCliente = cj.idCliente`;

            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error("Error al obtener todos los clientes:", error);
            throw error;
        }
    }
}

module.exports = ClienteDAO
