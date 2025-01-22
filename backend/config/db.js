const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tricks',
});

db.getConnection((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos');
});

module.exports = db;
