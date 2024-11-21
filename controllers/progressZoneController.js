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

async function getStatsPorZona(req,res){
    try{
        const id_usuario = req.user.id_usuario;
        const nombre_zona = req.body.nombre_zona;
        console.log(nombre_zona);
        const stats = await progressModel.getStatsPorZona(id_usuario,nombre_zona);
        res.status(200).json(stats);
    }catch(error){
        console.error('Error al obtener las estadisticas de la zona:', error);
        res.status(500).send('Error al obtener las estadisticas de la zona');
    }
}

module.exports = {obtenerProgresoPorUsuario, getStatsPorZona};
