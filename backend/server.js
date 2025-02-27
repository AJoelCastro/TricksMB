const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/ClienteRoutes');
const pedidoRoutes = require('./routes/PedidoRoutes');
const modeloRoutes = require('./routes/ModeloRoutes');
const tipoCalzadoRoutes = require('./routes/TipoCalzadoRoutes');
const AreaTrabajoRoutes = require('./routes/DetalleAreaTrabajoRoutes');
const caracteristicasRoutes = require('./routes/CaracteristicasRoutes');
const detallePedidoRoutes = require('./routes/DetallePedidoRoutes');
const errorHandler = require('./utils/errorHandler'); // Importamos errorHandler
require('dotenv').config();

// Crear la aplicación
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permitir solicitudes desde cualquier origen (útil para desarrollo)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, tokens)
};

// Middleware
app.use(cors(corsOptions)); // Usar la configuración de CORS
app.use(express.json()); // Para parsear JSON en las solicitudes

// Verificar que las variables de entorno estén configuradas
const requiredEnv = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`⚠️  La variable de entorno ${key} no está configurada.`);
        process.exit(1); // Detiene el servidor si falta una variable crítica
    }
});

// Rutas
app.use('/usuario', userRoutes);
app.use('/cliente', clienteRoutes);
app.use('/detallePedido',detallePedidoRoutes);
app.use('/pedido',pedidoRoutes);
app.use('/caracteristicas',caracteristicasRoutes);
app.use('/modelo', modeloRoutes);
app.use('/tipoCalzado', tipoCalzadoRoutes);
app.use('/detalleAreaTrabajo', AreaTrabajoRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global con `errorHandler`
app.use((err, req, res, next) => {
    console.error(err.stack);
    errorHandler(res, err, 500);
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red
app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
});

const ip = require('ip');
console.log('Tu IP actual es:', ip.address());




