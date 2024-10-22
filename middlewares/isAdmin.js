const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(403).send('Token no proporcionado');
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.rol !== 'admin'){
            return res.status(403).send('No tienes permisos de administrador');
        }
        req.user = decoded;
        next();
    } catch(error){
        console.error(error);
        return res.status(401).send('Token no válido o expirado');
    }
}

module.exports = {isAdmin};