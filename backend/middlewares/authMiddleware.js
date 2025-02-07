const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

const authMiddleware = (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return errorHandler(res, new Error('Acceso denegado. Token no proporcionado.'), 401);
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
        req.user = decoded; // Añadir el usuario decodificado a la solicitud
        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        errorHandler(res, new Error('Token inválido o expirado.'), 401);
    }
};

module.exports = authMiddleware;
