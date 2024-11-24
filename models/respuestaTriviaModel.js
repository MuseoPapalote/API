const {db} = require('../database/db');

async function createRespuestaTrivia(id_pregunta, id_usuario, opcion_seleccionada){
    try{
        const queryCorrecta = 'SELECT respuesta_correcta FROM preguntatrivia WHERE id_pregunta = $1;';
        const resultCorrecta = await db.query(queryCorrecta, [id_pregunta]);
        const respuestaCorrecta = resultCorrecta.rows[0].respuesta_correcta;

        const esCorrecta = respuestaCorrecta === opcion_seleccionada;
        const query = 'INSERT INTO respuestatrivia (id_usuario, id_pregunta, opcion_seleccionada, es_correcta) VALUES ($1, $2, $3, $4) RETURNING id_usuario, id_pregunta, opcion_seleccionada, es_correcta;';
        const {rows} = await db.query(query, [id_usuario, id_pregunta, opcion_seleccionada, esCorrecta]);
        return rows[0];
    }catch(error){
        console.error('Error al crear respuestaTrivia:', error);
        throw error;
    }
}

async function getUserRespuestaTriviaAnswers(id_usuario){
    try{
        const query = 'SELECT r.id_respuesta, r.opcion_seleccionada, r.es_correcta, p.texto_pregunta, p.opcion_1, p.opcion_2, p.opcion_3 FROM respuestatrivia r JOIN preguntatrivia p ON r.id_pregunta = p.id_pregunta WHERE r.id_usuario = $1;';
        const {rows} = await db.query(query, [id_usuario]);
        return rows;
    }catch(error){
        console.error('Error al obtener respuestasTrivia de usuario:', error);
        throw error;
    }   
}

module.exports = {createRespuestaTrivia, getUserRespuestaTriviaAnswers};