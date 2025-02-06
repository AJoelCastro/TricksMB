// UsuarioDAO.js
const db = require('../config/db'); // Asegúrate de tener tu conexión a la base de datos configurada

const UsuarioDAO = {
    async createUser(correo, contrasenia) {
        const query = 'INSERT INTO usuario (Correo, Contraseña) VALUES (?, ?)';
        const [result] = await db.execute(query, [correo, contrasenia]);
        return { id: result.insertId, correo };
    },

    async encUser(correo) {
        const query = 'SELECT * FROM usuario WHERE Correo = ?';
        const [rows] = await db.execute(query, [correo]);
        if (rows[0] === null) {
            console.log("No se encontró ningún usuario con el correo proporcionado.");
        } else {
            console.log("Usuario encontrado:", rows[0]);
        }
        return rows[0] ;
    },

    async getAll() {
        const query = 'SELECT * FROM usuario';
        const [rows] = await db.execute(query);
        return rows;
    },

    async getById(idUsuario) {
        const query = 'SELECT * FROM usuario WHERE idUsuario = ?';
        const [rows] = await db.execute(query, [idUsuario]);
        return rows[0] || null;
    },

    async delete(idUsuario) {
        const query = 'DELETE FROM usuario WHERE idUsuario = ?';
        await db.execute(query, [idUsuario]);
    }
};

module.exports = UsuarioDAO;