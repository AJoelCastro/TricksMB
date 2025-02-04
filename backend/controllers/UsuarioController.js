const UsuarioService = require('../services/UsuarioService');
const errorHandler = require('../utils/errorHandler');

const UsuarioController = {
    async getUsers(req, res) {
        try {
            const users = await UsuarioService.getUsers();
            res.json(users);
        } catch (error) {
            errorHandler(res, error);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await UsuarioService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            errorHandler(res, error, 404);
        }
    },

    async createUser(req, res) {
        try {
            const { email, contraseña } = req.body;
            const newUser = await UsuarioService.createUser(email, contraseña);
            res.status(201).json({ message: 'Usuario creado', user: newUser });
        } catch (error) {
            errorHandler(res, error, 400);
        }
    },

    async deleteUser(req, res) {
        try {
            await UsuarioService.deleteUser(req.params.id);
            res.json({ message: 'Usuario eliminado' });
        } catch (error) {
            errorHandler(res, error, 400);
        }
    }
};

module.exports = UsuarioController;