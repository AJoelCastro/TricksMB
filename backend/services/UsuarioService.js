const bcrypt = require('bcrypt');
const UsuarioDAO = require('../dao/UsuarioDAO');

const UsuarioService = {
    async getUsers() {
        return await UsuarioDAO.getAll();
    },

    async getUserById(id) {
        const user = await UsuarioDAO.getById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    async createUser(email, contraseña) {
        if (!email || !contraseña) throw new Error('Correo y contraseña son requeridos');

        // Encriptar contraseña antes de guardar
        const hashedContraseña = await bcrypt.hash(contraseña, 10);
        return await UsuarioDAO.insert(email, hashedContraseña);
    },

    async deleteUser(id) {
        await UsuarioDAO.delete(id);
    }
};

module.exports = UsuarioService;