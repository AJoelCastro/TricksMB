const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const mysql = require('mysql2');

// Crear la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verificar que las variables de entorno estén configuradas
const requiredEnv = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`⚠️  La variable de entorno ${key} no está configurada.`);
    process.exit(1); // Detiene el servidor si falta una variable crítica
  }
});

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    process.exit(1); // Detiene el servidor si no hay conexión
  } else {
    console.log('✅ Conexión exitosa con la base de datos');
  }
});

// Rutas
app.use('/usuario', userRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Inicia el servidor
const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
