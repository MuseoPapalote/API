const progressModel = require('../models/progressZoneModel');

// Obtener el progreso del usuario en todas las zonas
async function obtenerProgresoPorUsuario(req, res) {
    const id_usuario = req.user.id_usuario;  // El ID del usuario lo obtenemos del token JWT
    try {
        const progreso = await progressModel.getProgresoPorUsuario(id_usuario);
        res.status(200).json(progreso);
    } catch (error) {
        console.error('Error al obtener el progreso por usuario:', error);
        res.status(500).send('Error al obtener el progreso');
    }
}

module.exports = {obtenerProgresoPorUsuario};
