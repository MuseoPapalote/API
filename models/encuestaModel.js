const {db} = require('../database/db');

async function createAnswer({id_usuario,calificacion_general,comentarios}){
    try{
        const query = 'INSERT INTO encuestasatisfaccion (id_usuario, calificacion_general, comentarios) VALUES ($1, $2, $3) RETURNING *;';
        const {rows} = await db.query(query, [id_usuario, calificacion_general, comentarios]);
        return rows[0];
    }catch(error){
        console.error('Error al crear respuesta:', error);
        throw error;
    }
}

module.exports = {createAnswer}