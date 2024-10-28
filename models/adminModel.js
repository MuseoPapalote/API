const { db } = require('../database/db');

// Zonas
async function createZona(nombre_zona, descripcion) {
    const query = 'INSERT INTO zona (nombre_zona, descripcion) VALUES ($1, $2) RETURNING *;';
    const { rows } = await db.query(query, [nombre_zona, descripcion]);
    return rows[0];
}

async function editZona(id_zona, nombre_zona, descripcion) {
    const query = 'UPDATE zona SET nombre_zona = $1, descripcion = $2 WHERE id_zona = $3 RETURNING *;';
    const { rows } = await db.query(query, [nombre_zona, descripcion, id_zona]);
    return rows[0];
}

async function deleteZona(id_zona) {
    const exposicionQuery = 'DELETE FROM exposicion WHERE id_zona = $1;';
    await db.query(exposicionQuery, [id_zona]);
    const progresoQuery = 'DELETE FROM progresozona WHERE id_zona = $1;';
    await db.query(progresoQuery, [id_zona]);
    const query = 'DELETE FROM zona WHERE id_zona = $1;';
    await db.query(query, [id_zona]);
}

// Exposiciones
async function createExposicion(id_zona, nombre_exposicion, descripcion, codigo_qr) {
    const query = 'INSERT INTO exposicion (id_zona, nombre_exposicion, descripcion, codigo_qr) VALUES ($1, $2, $3, $4) RETURNING *;';
    const { rows } = await db.query(query, [id_zona, nombre_exposicion, descripcion, codigo_qr]);
    return rows[0];
}

async function editExposicion(id_exposicion, nombre_exposicion, descripcion, codigo_qr, activo) {
    const query = 'UPDATE exposicion SET nombre_exposicion = $1, descripcion = $2, codigo_qr = $3, activo = $4 WHERE id_exposicion = $5 RETURNING *;';
    const { rows } = await db.query(query, [nombre_exposicion, descripcion, codigo_qr, activo, id_exposicion]);
    return rows[0];
}

async function deleteExposicion(id_exposicion) {
    const visitaQuery = 'DELETE FROM visita WHERE id_exposicion = $1;';
    const query = 'DELETE FROM exposicion WHERE id_exposicion = $1;';
    await db.query(visitaQuery, [id_exposicion]);
    await db.query(query, [id_exposicion]);
}

// Preguntas
async function createPregunta(texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta) {
    const query = 'INSERT INTO preguntatrivia (texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const { rows } = await db.query(query, [texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta]);
    return rows[0];
}

async function editPregunta(id_pregunta, texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta) {
    const query = 'UPDATE preguntatrivia SET texto_pregunta = $1, opcion_1 = $2, opcion_2 = $3, opcion_3 = $4, respuesta_correcta = $5 WHERE id_pregunta = $6 RETURNING *;';
    const { rows } = await db.query(query, [texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta, id_pregunta]);
    return rows[0];
}

async function deletePregunta(id_pregunta) {
    const query = 'DELETE FROM preguntatrivia WHERE id_pregunta = $1;';
    await db.query(query, [id_pregunta]);
}

async function getAllZonas() {
    const query = 'SELECT * FROM zona;';
    const { rows } = await db.query(query);
    return rows;
  }
  
  async function getZonaById(id_zona) {
    const query = 'SELECT * FROM zona WHERE id_zona = $1;';
    const { rows } = await db.query(query, [id_zona]);
    return rows[0];
  }
  
  // Exposiciones
  async function getAllExposiciones() {
    const query = 'SELECT * FROM exposicion;';
    const { rows } = await db.query(query);
    return rows;
  }
  
  async function getExposicionById(id_exposicion) {
    const query = 'SELECT * FROM exposicion WHERE id_exposicion = $1;';
    const { rows } = await db.query(query, [id_exposicion]);
    return rows[0];
  }
  
  // Preguntas
  async function getAllPreguntas() {
    const query = 'SELECT * FROM preguntatrivia;';
    const { rows } = await db.query(query);
    return rows;
  }
  
  async function getPreguntaById(id_pregunta) {
    const query = 'SELECT * FROM preguntatrivia WHERE id_pregunta = $1;';
    const { rows } = await db.query(query, [id_pregunta]);
    return rows[0];
  }

module.exports = {createZona, editZona, deleteZona, createExposicion, editExposicion, deleteExposicion, createPregunta, editPregunta, deletePregunta, getAllZonas, getZonaById, getAllExposiciones, getExposicionById, getAllPreguntas, getPreguntaById};