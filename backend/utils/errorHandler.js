const errorHandler = (err, req, res, next) => {
    console.error(err); // Registrar el error en la consola

    const statusCode = err.status || 500; // Si el error tiene un código de estado, úsalo; de lo contrario, usa 500
    const message = err.message || "Error interno del servidor";

    res.status(statusCode).json({ message, status: statusCode });
};

module.exports = errorHandler;
