const {db} = require('../database/db');

async function getZoneByExpositionById(id_exposicion){
    try{
        const query = 'SELECT id_zona FROM exposicion WHERE id_exposicion = $1;';
        const response = await db.query(query, [id_exposicion]);
        return response.rows;
    } catch(error){
        console.error('Error al obtener zonas por exposición:', error);
        throw error;
    }
}

async function getNumberOfExpositionsByZone(id_zona){
    try{
        const query = 'SELECT COUNT(*) FROM exposicion WHERE id_zona = $1 and activo = true;';
        const response = await db.query(query, [id_zona]);
        return response.rows[0].count;
    } catch(error){
        console.error('Error al obtener número de exposiciones por zona:', error);
        throw error;
    }
}

module.exports = {getZoneByExpositionById, getNumberOfExpositionsByZone}