const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuario', userRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});