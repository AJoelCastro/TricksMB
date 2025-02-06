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

    async createUser(username, password) {
        if (!username || !password) throw new Error('Nombre de usuario y contraseña son requeridos');

        // Encriptar contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);
        return await UsuarioDAO.createUser(username, hashedPassword);
    },

    async findUser(username, password) {
        const user = await UsuarioDAO.findUser(username);
        if (!user) return null;

        // Comparar la contraseña proporcionada con la contraseña encriptada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    },

    async deleteUser(id) {
        await UsuarioDAO.delete(id);
    }
};

module.exports = UsuarioService;