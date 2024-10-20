const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];  // Espera que el token esté en el header 'Authorization'

    if (!token) {
        return res.status(403).send('Token no proporcionado.');
    }

    // Verificar el token
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token no válido o expirado.');
        }

        // Si el token es válido, almacenamos el usuario decodificado en req.user
        req.user = decoded;
        next();
    });
}

module.exports = { isAuthenticated };
