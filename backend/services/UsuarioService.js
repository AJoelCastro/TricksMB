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

        // Encriptar contraseña antes de guardar
        //const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
        return await UsuarioDAO.createUser(correo, contrasenia);
    },

    async findUser(correo, contrasenia) {
        const user = await UsuarioDAO.encUser(correo);
        console.log(user);
        if (!user) return null;

        // Comparar la contraseña proporcionada con la contraseña encriptada en la base de datos
        //const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);
        const isPasswordValid = contrasenia === user.Contraseña;
        if (!isPasswordValid) {
            console.log("Contrasenias invalidas");  
            console.log(user.contrasenia);
            console.log(user.correo);
            console.log(contrasenia);
            return null;
        };
        return user;
    },

    async deleteUser(idUsuario) {
        await UsuarioDAO.delete(idUsuario);
    }
};

module.exports = UsuarioService;