// UsuarioDAO.js
const db = require('../config/db'); // Asegúrate de tener tu conexión a la base de datos configurada

const UsuarioDAO = {
    async createUser(username, password) {
        const query = 'INSERT INTO usuario (Correo, Contraseña) VALUES (?, ?)';
        const [result] = await db.execute(query, [username, password]);
        return { id: result.insertId, username };
    },

    async findUser(username) {
        const query = 'SELECT * FROM usuario WHERE Correo = ?';
        const [rows] = await db.execute(query, [username]);
        return rows[0] || null;
    },

    async getAll() {
        const query = 'SELECT * FROM usuario';
        const [rows] = await db.execute(query);
        return rows;
    },

    async getById(id) {
        const query = 'SELECT * FROM usuario WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    },

    async delete(id) {
        const query = 'DELETE FROM usuario WHERE idUsuario = ?';
        await db.execute(query, [id]);
    }
};

module.exports = UsuarioDAO;