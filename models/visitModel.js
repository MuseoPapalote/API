const {db} = require('../database/db');

async function registerVisit({id_usuario, id_exposicion}){
    try{
        const query = 'INSERT INTO visita (id_usuario, id_exposicion) VALUES ($1, $2) RETURNING *;';
        const {rows} = await db.query(query, [id_usuario, id_exposicion]);
        return rows[0];
    } catch(error){
        console.error('Error al registrar visita:', error);
        throw error;
    }
}

module.exports = {registerVisit}