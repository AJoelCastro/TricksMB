const UsuarioService = require('../services/UsuarioService');

const UsuarioController = {
    async register(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const result = await UsuarioService.createUser(username, password);
            res.status(201).json({ success: true, message: "Usuario registrado exitosamente", userId: result.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al registrar usuario" });
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const user = await UsuarioService.findUser(username, password);
            if (user) {
                res.json({ success: true, message: "Inicio de sesión exitoso", user });
            } else {
                res.status(401).json({ success: false, message: "Credenciales incorrectas" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al iniciar sesión" });
        }
    }
};

module.exports = UsuarioController;