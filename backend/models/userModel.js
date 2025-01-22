const db = require('../config/db');

// Función para obtener todos los usuarios
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuario';
        db.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Función para insertar un usuario
const insertUser = (email, hashedContraseña) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usuario (Correo, Contraseña) VALUES (?, ?)';
        db.query(query, [email, hashedContraseña], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

module.exports = {
    getAllUsers,
    insertUser,
};
