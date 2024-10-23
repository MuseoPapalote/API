const {db} = require('../database/db');

async function registerVisit({id_usuario, id_exposicion}){
    try{
        const query = 'INSERT INTO visita (id_usuario, id_exposicion) VALUES ($1, $2);';
        await db.query(query, [id_usuario, id_exposicion]);
    } catch(error){
        console.error('Error al registrar visita:', error);
        throw error;
    }
}

async function getNumberOfVisitsByUser(id_usuario){
    try{
        const query = 'SELECT COUNT(*) FROM visita WHERE id_usuario = $1;';
        const response = await db.query(query, [id_usuario]);
        return response.rows[0].count;
    } catch(error){
        console.error('Error al obtener número de visitas por usuario:', error);
        throw error;
    }
}

module.exports = {registerVisit, getNumberOfVisitsByUser}