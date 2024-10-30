const { db } = require('../database/db');

// Zonas
async function createZona(nombre_zona, descripcion) {
    try {
        const query = 'INSERT INTO zona (nombre_zona, descripcion) VALUES ($1, $2) RETURNING *;';
        const { rows } = await db.query(query, [nombre_zona, descripcion]);
        return rows[0];
    } catch (error) {
        console.error('Error creating zona:', error);
        throw error;
    }
}

async function editZona(id_zona, nombre_zona, descripcion) {
    try {
        const query = 'UPDATE zona SET nombre_zona = $1, descripcion = $2 WHERE id_zona = $3 RETURNING *;';
        const { rows } = await db.query(query, [nombre_zona, descripcion, id_zona]);
        return rows[0];
    } catch (error) {
        console.error('Error editing zona:', error);
        throw error;
    }
}

async function deleteZona(id_zona) {
    try {
        const exposicionQuery = 'DELETE FROM exposicion WHERE id_zona = $1;';
        await db.query(exposicionQuery, [id_zona]);
        const progresoQuery = 'DELETE FROM progresozona WHERE id_zona = $1;';
        await db.query(progresoQuery, [id_zona]);
        const query = 'DELETE FROM zona WHERE id_zona = $1;';
        await db.query(query, [id_zona]);
    } catch (error) {
        console.error('Error deleting zona:', error);
        throw error;
    }
}

// Exposiciones
async function createExposicion(id_zona, nombre_exposicion, descripcion, codigo_qr) {
    try {
        const query = 'INSERT INTO exposicion (id_zona, nombre_exposicion, descripcion, codigo_qr) VALUES ($1, $2, $3, $4) RETURNING *;';
        const { rows } = await db.query(query, [id_zona, nombre_exposicion, descripcion, codigo_qr]);
        return rows[0];
    } catch (error) {
        console.error('Error creating exposicion:', error);
        throw error;
    }
}

async function editExposicion(id_exposicion, nombre_exposicion, descripcion, codigo_qr, activo) {
    try {
        const query = 'UPDATE exposicion SET nombre_exposicion = $1, descripcion = $2, codigo_qr = $3, activo = $4 WHERE id_exposicion = $5 RETURNING *;';
        const { rows } = await db.query(query, [nombre_exposicion, descripcion, codigo_qr, activo, id_exposicion]);
        return rows[0];
    } catch (error) {
        console.error('Error editing exposicion:', error);
        throw error;
    }
}

async function deleteExposicion(id_exposicion) {
    try {
        const visitaQuery = 'DELETE FROM visita WHERE id_exposicion = $1;';
        await db.query(visitaQuery, [id_exposicion]);
        const query = 'DELETE FROM exposicion WHERE id_exposicion = $1;';
        await db.query(query, [id_exposicion]);
    } catch (error) {
        console.error('Error deleting exposicion:', error);
        throw error;
    }
}

// Preguntas
async function createPregunta(texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta) {
    try {
        const query = 'INSERT INTO preguntatrivia (texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const { rows } = await db.query(query, [texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta]);
        return rows[0];
    } catch (error) {
        console.error('Error creating pregunta:', error);
        throw error;
    }
}

async function editPregunta(id_pregunta, texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta) {
    try {
        const query = 'UPDATE preguntatrivia SET texto_pregunta = $1, opcion_1 = $2, opcion_2 = $3, opcion_3 = $4, respuesta_correcta = $5 WHERE id_pregunta = $6 RETURNING *;';
        const { rows } = await db.query(query, [texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta, id_pregunta]);
        return rows[0];
    } catch (error) {
        console.error('Error editing pregunta:', error);
        throw error;
    }
}

async function deletePregunta(id_pregunta) {
    try {
        const query = 'DELETE FROM preguntatrivia WHERE id_pregunta = $1;';
        await db.query(query, [id_pregunta]);
    } catch (error) {
        console.error('Error deleting pregunta:', error);
        throw error;
    }
}

async function getAllZonas() {
    try {
        const query = 'SELECT * FROM zona;';
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error getting all zonas:', error);
        throw error;
    }
}

async function getZonaById(id_zona) {
    try {
        const query = 'SELECT * FROM zona WHERE id_zona = $1;';
        const { rows } = await db.query(query, [id_zona]);
        return rows[0];
    } catch (error) {
        console.error('Error getting zona by id:', error);
        throw error;
    }
}

// Exposiciones
async function getAllExposiciones() {
    try {
        const query = 'SELECT * FROM exposicion;';
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error getting all exposiciones:', error);
        throw error;
    }
}

async function getExposicionById(id_exposicion) {
    try {
        const query = 'SELECT * FROM exposicion WHERE id_exposicion = $1;';
        const { rows } = await db.query(query, [id_exposicion]);
        return rows[0];
    } catch (error) {
        console.error('Error getting exposicion by id:', error);
        throw error;
    }
}

// Preguntas
async function getAllPreguntas() {
    try {
        const query = 'SELECT * FROM preguntatrivia;';
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error getting all preguntas:', error);
        throw error;
    }
}

async function getPreguntaById(id_pregunta) {
    try {
        const query = 'SELECT * FROM preguntatrivia WHERE id_pregunta = $1;';
        const { rows } = await db.query(query, [id_pregunta]);
        return rows[0];
    } catch (error) {
        console.error('Error getting pregunta by id:', error);
        throw error;
    }
}

module.exports = {
    createZona,
    editZona,
    deleteZona,
    createExposicion,
    editExposicion,
    deleteExposicion,
    createPregunta,
    editPregunta,
    deletePregunta,
    getAllZonas,
    getZonaById,
    getAllExposiciones,
    getExposicionById,
    getAllPreguntas,
    getPreguntaById
};