const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Espera a que haya conexiones disponibles
    connectionLimit: 10,      // Límite de conexiones simultáneas
    queueLimit: 0             // Sin límite en la cola de espera
});

module.exports = db.promise(); // Usamos promesas para evitar callbacks anidados