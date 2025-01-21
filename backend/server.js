const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const connection = mysql.createConnection({
  host: 'localhost',        // Dirección del servidor
  user: 'root',             // Usuario de la base de datos
  password: '',             // Contraseña (vacío si no tiene)
  database: 'tricks'        // Nombre de la base de datos
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos');
});



// Ruta para obtener todos los usuarios
app.get('/usuario', (req, res) => {
    const query = 'SELECT * FROM usuario';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios', details: err.message });
        }
        res.json(result);
    });
});

// Ruta para insertar un nuevo usuario
app.post('/usuario', (req, res) => {
    const { email, contraseña } = req.body;

    // Validar datos
    if (!email || !contraseña) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    // Encriptar la contraseña
    bcrypt.hash(contraseña, 10, (err, hashedContraseña) => {
        if (err) {
            return res.status(500).json({ error: 'Error al encriptar la contraseña', details: err.message });
        }

        // Query para insertar el usuario
        const query = 'INSERT INTO usuario (Correo, Contraseña) VALUES (?, ?)';
        db.query(query, [email, hashedContraseña], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear usuario', details: err.message });
            }
            res.json({ message: 'Usuario creado exitosamente', id: result.insertId });
        });
    });
});

// Inicia el servidor
const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cerrar la conexión al finalizar
connection.end();