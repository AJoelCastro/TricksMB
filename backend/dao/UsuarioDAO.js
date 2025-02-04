const db = require('../config/db');

const UsuarioDAO = {
    async getAll() {
        const [rows] = await db.promise().query('SELECT idUsuario, Correo FROM usuario');
        return rows;
    },

    async getById(id) {
    const [rows] = await db.promise().query('SELECT idUsuario, Correo FROM usuario WHERE idUsuario = ?', [id]);
    return rows[0];
    },


    async insert(correo, contrasenia) {
        const [result] = await db.promise().query('INSERT INTO usuario (Correo, Contraseña) VALUES (?, ?)', [correo, contrasenia]);
        return { idUsuario: result.insertId, correo };
    },

    async delete(id) {
        await db.promise().query('DELETE FROM usuario WHERE idUsuario = ?', [id]);
    }
};

module.exports = UsuarioDAO;
