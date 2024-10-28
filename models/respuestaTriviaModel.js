const {db} = require('../database/db');

async function createRespuestaTrivia(id_pregunta, id_usuario, opcion_seleccionada){
    try{
        const queryCorrecta = 'SELECT respuesta_correcta FROM preguntatrivia WHERE id_pregunta = $1;';
        const resultCorrecta = await db.query(queryCorrecta, [id_pregunta]);
        const respuestaCorrecta = resultCorrecta.rows[0].respuesta_correcta;

        const esCorrecta = respuestaCorrecta === opcion_seleccionada;
        const query = 'INSERT INTO respuestatrivia (id_usuario, id_pregunta, opcion_seleccionada, es_correcta) VALUES ($1, $2, $3, $4) RETURNING *;';
        const {rows} = await db.query(query, [id_usuario, id_pregunta, opcion_seleccionada, esCorrecta]);
        return rows[0];
    }catch(error){
        console.error('Error al crear respuestaTrivia:', error);
        throw error;
    }
}

module.exports = {createRespuestaTrivia};