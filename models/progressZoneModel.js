const {db} = require('../database/db');

async function updateProgressZone({id_usuario, id_zona, exposiciones_visitadas, porcentaje_avance}){
    try{
        const query = 'UPDATE progresozona SET exposiciones_visitadas = $3, porcentaje_avance = $4 WHERE id_usuario = $1 AND id_zona = $2;';
        await db.query(query, [id_usuario, id_zona, exposiciones_visitadas, porcentaje_avance]);
    } catch(error){
        console.error('Error al actualizar progreso de zona:', error);
        throw error;
    }
}

module.exports = {updateProgressZone}