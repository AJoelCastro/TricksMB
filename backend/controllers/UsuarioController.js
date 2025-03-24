const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');

const UsuarioController = {
    async register(req, res) {
        const { idEmpleado, correo, contrasenia } = req.body;
        if (!idEmpleado || !correo || !contrasenia) {
            res.json({ success: false, message: "Todos los campos son obligatorios" });
        }

        try {
            const result = await UsuarioService.createUser(idEmpleado, correo, contrasenia);
            res.json({ success: true, message: "Usuario registrado exitosamente", result , status: 201 });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Error al registrar usuario" });
        }
    },

    async login(req, res) {
        const { correo, contrasenia } = req.body;
        if (!correo || !contrasenia) {
            res.json({ success: false, message: "Todos los campos son obligatorios", status: error.status });
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
                res.json({ success: false, message: "Correo o contraseña incorrectos" , status: error.status });
            }
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Error al iniciar sesión", status: error.status });
        }
    },

    async getByCorrreo(req, res) {
        const { correo } = req.params;
        if (!correo) {
            res.json({ message: "El correo es obligatorio", status: error.status });
        }

        try {
            const user = await UsuarioService.getUserByCorreo(correo);
            res.json({ user, status: 200 });
        } catch (error) {
            console.error(error);
            res.json({ message: "Error al obtener usuario por correo", status: error.status });
        }
    }
};

module.exports = UsuarioController;
