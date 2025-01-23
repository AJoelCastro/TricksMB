const bcrypt = require('bcrypt');
const { getAllUsers, insertUser } = require('../models/userModel');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { email, contraseña } = req.body;

    // Validar datos
    if (!email || !contraseña) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    try {
        // Encriptar contraseña
        const hashedContraseña = await bcrypt.hash(contraseña, 10);
        const userId = await insertUser(email, hashedContraseña);
        res.json({ message: 'Usuario creado exitosamente', id: userId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
};
