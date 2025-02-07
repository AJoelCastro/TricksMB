const bcrypt = require('bcrypt');

const UsuarioDAO = require('../dao/UsuarioDAO');

const UsuarioService = {
    async getUsers() {
        return await UsuarioDAO.getAll();
    },

    async getUserById(idUsuario) {
        const user = await UsuarioDAO.getById(idUsuario);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    async createUser(correo, contrasenia) {
        if (!correo || !contrasenia) throw new Error('Nombre de usuario y contraseña son requeridos');

        const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
        return await UsuarioDAO.createUser(correo, hashedContrasenia);
    },

    async findUser(correo, contrasenia) {
        const user = await UsuarioDAO.encUser(correo);
        //Depuración
        console.log(user);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(contrasenia, user.Contraseña);
        if (!isPasswordValid) return null;
        return user;
    },

    async deleteUser(idUsuario) {
        await UsuarioDAO.delete(idUsuario);
    }
};

module.exports = UsuarioService;