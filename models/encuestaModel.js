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

async function getEncuestaResultados() {
    const query = `
        SELECT 
            AVG(e.calificacion_general) AS promedio_calificacion,
            ARRAY_AGG(json_build_object(
                'email', u.email,
                'comentario', e.comentarios,
                'id_encuesta', e.id_encuesta
            )) FILTER (WHERE e.comentarios IS NOT NULL AND e.respondido = FALSE) AS comentarios
        FROM encuestasatisfaccion e
        LEFT JOIN usuario u ON e.id_usuario = u.id_usuario
        WHERE e.calificacion_general IS NOT NULL;
    `;
    
    const { rows } = await db.query(query);
    return rows[0];
}

async function marcarComentarioRespondido(id_encuesta) {
    const query = `
        UPDATE encuestasatisfaccion
        SET respondido = TRUE
        WHERE id_encuesta = $1
        RETURNING *;
    `;
    const { rows } = await db.query(query, [id_encuesta]);
    return rows[0];
}

module.exports = {createAnswer, getEncuestaResultados, marcarComentarioRespondido};