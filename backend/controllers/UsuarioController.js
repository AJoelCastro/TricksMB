const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');

const UsuarioController = {
    async register(req, res) {
        const { idEmpleado, correo, contrasenia } = req.body;
        if (!idEmpleado || !correo || !contrasenia) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const result = await UsuarioService.createUser(idEmpleado, correo, contrasenia);
            res.status(201).json({ success: true, message: "Usuario registrado exitosamente", userId: result.idUsuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al registrar usuario" });
        }
    },

    async login(req, res) {
        const { correo, contrasenia } = req.body;
        if (!correo || !contrasenia) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const user = await UsuarioService.findUser(correo, contrasenia);
            if (user) {
                // Generamos el token
                const token = jwt.sign(
                    { userId: user.idUsuario, correo: user.Correo },
                    process.env.JWT_SECRET || 'secreto_super_seguro',
                    { expiresIn: '16h' }
                );

                res.json({ success: true, message: "Inicio de sesión exitoso", token });
            } else {
                res.status(401).json({ success: false, message: "Credenciales incorrectas" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al iniciar sesión" });
        }
    },

    async getByCorrreo(req, res) {
        const { correo } = req.params;
        if (!correo) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        try {
            const user = await UsuarioService.getUserByCorreo(correo);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener usuario" });
        }
    }
};

module.exports = UsuarioController;
