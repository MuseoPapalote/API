const { db } = require('../database/db');


async function getAdminOverview(){
    try{
        const query = `
        SELECT
            (SELECT COUNT(*) FROM zona) AS total_zonas,
            (SELECT COUNT(*) FROM exposicion) AS total_exposiciones;
    `;
        const { rows } = await db.query(query);
        return rows;
    }catch(error){
        console.error('Error getting admin overview:', error);
        throw error;
    }
}

async function getVisitStats(){
    try{
        const queryZonas = `
        SELECT z.id_zona, z.nombre_zona, COUNT(v.id_visita) AS total_visitas_zona
        FROM zona z
        JOIN exposicion e ON e.id_zona = z.id_zona
        JOIN visita v ON v.id_exposicion = e.id_exposicion
        GROUP BY z.id_zona;
    `;
    const queryExposiciones = `
        SELECT e.id_exposicion, e.nombre_exposicion, COUNT(v.id_visita) AS total_visitas_exposicion
        FROM exposicion e
        JOIN visita v ON v.id_exposicion = e.id_exposicion
        GROUP BY e.id_exposicion;
    `;
    const zonas = await db.query(queryZonas);
    const exposiciones = await db.query(queryExposiciones);
    return { zonas: zonas.rows, exposiciones: exposiciones.rows };
    }catch(error){
        console.error('Error getting visit stats:', error);
        throw error;
    }
}


// Zonas
async function createZona(nombre_zona, descripcion) {
    try {
        const insertZonaQuery = 'INSERT INTO zona (nombre_zona, descripcion) VALUES ($1, $2) RETURNING id_zona;';
        const { rows } = await db.query(insertZonaQuery, [nombre_zona, descripcion]);
        const id_zona = rows[0].id_zona;

        // Obtener todos los usuarios existentes
        const usersQuery = 'SELECT id_usuario FROM usuario';
        const { rows: users } = await db.query(usersQuery);

        // Crear progreso para cada usuario en la nueva zona
        const totalExposicionesQuery = 'SELECT COUNT(*) AS total FROM exposicion WHERE id_zona = $1;';
        const { rows: exposiciones } = await db.query(totalExposicionesQuery, [id_zona]);
        const totalExposiciones = parseInt(exposiciones[0].total, 10);

        const insertProgressQuery = `
            INSERT INTO progresozona (id_usuario, id_zona, exposiciones_visitadas, total_exposiciones, porcentaje_avance)
            VALUES ($1, $2, 0, $3, 0.0);
        `;

        for (let user of users) {
            await db.query(insertProgressQuery, [user.id_usuario, id_zona, totalExposiciones]);
        }

        return rows[0];
    } catch (error) {
        console.error('Error al crear zona:', error);
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
    console.log(id_zona);
    try {
        const exposiciones = 'SELECT id_exposicion FROM exposicion WHERE id_zona = $1;';
        const { rows } = await db.query(exposiciones, [id_zona]);

        for (let exposicion of rows) {
            const visitaQuery = 'DELETE FROM visita WHERE id_exposicion = $1;';
            await db.query(visitaQuery, [exposicion.id_exposicion]);
            const preguntas = 'SELECT id_pregunta FROM preguntatrivia WHERE id_exposicion = $1;';
            const { rows } = await db.query(preguntas, [exposicion.id_exposicion]);
            for (let pregunta of rows) {
                const respuestas = 'DELETE FROM respuestatrivia WHERE id_pregunta = $1;';
                await db.query(respuestas, [pregunta.id_pregunta]);
            }
            const preguntaQuery = 'DELETE FROM preguntatrivia WHERE id_exposicion = $1;';
            await db.query(preguntaQuery, [exposicion.id_exposicion]);
        }

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
        const preguntas = 'SELECT id_pregunta FROM preguntatrivia WHERE id_exposicion = $1;';
        const { rows } = await db.query(preguntas, [id_exposicion]);

        for (let pregunta of rows) {
            const respuestas = 'DELETE FROM respuestatrivia WHERE id_pregunta = $1;';
            await db.query(respuestas, [pregunta.id_pregunta]);
        }

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
async function createPregunta(id_exposicion,texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta) {
    try {
        const query = 'INSERT INTO preguntatrivia (id_exposicion,texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
        const { rows } = await db.query(query, [id_exposicion,texto_pregunta, opcion_1, opcion_2, opcion_3, respuesta_correcta]);
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
        const queryRespuesta = 'DELETE FROM respuestatrivia WHERE id_pregunta = $1;';
        await db.query(queryRespuesta, [id_pregunta]);
        const query = 'DELETE FROM preguntatrivia WHERE id_pregunta = $1;';
        await db.query(query, [id_pregunta]);
    } catch (error) {
        console.error('Error deleting pregunta:', error);
        throw error;
    }
}

async function getAllZonas() {
    try {
        const query = `
        SELECT 
            z.id_zona,
            z.nombre_zona,
            z.descripcion,
            COALESCE(SUM(vs.total_visitas), 0) AS total_visitas
        FROM zona z
        LEFT JOIN (
            SELECT e.id_zona, COUNT(v.id_visita) AS total_visitas
            FROM exposicion e
            LEFT JOIN visita v ON v.id_exposicion = e.id_exposicion
            GROUP BY e.id_zona
        ) vs ON vs.id_zona = z.id_zona
        GROUP BY z.id_zona;
    `;
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
        const query = `
        SELECT 
            e.id_exposicion,
            e.nombre_exposicion,
            z.nombre_zona AS nombre_zona,
            e.descripcion,
            e.codigo_qr,
            e.activo,
            COUNT(v.id_visita) AS total_visitas
        FROM exposicion e
        LEFT JOIN zona z ON z.id_zona = e.id_zona
        LEFT JOIN visita v ON v.id_exposicion = e.id_exposicion
        GROUP BY e.id_exposicion, z.nombre_zona;
    `;
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error getting all exposiciones:', error);
        throw error;
    }
}

async function getExposicionById(id_exposicion) {
    const exposicionQuery = `
        SELECT 
            e.id_exposicion,
            e.nombre_exposicion,
            z.nombre_zona AS nombre_zona,
            e.descripcion,
            e.codigo_qr,
            e.activo
        FROM exposicion e
        LEFT JOIN zona z ON e.id_zona = z.id_zona
        WHERE e.id_exposicion = $1;
    `;

    const preguntasQuery = `
        SELECT 
            p.id_pregunta,
            p.texto_pregunta,
            p.opcion_1,
            p.opcion_2,
            p.opcion_3,
            p.respuesta_correcta
        FROM preguntatrivia p
        WHERE p.id_exposicion = $1;
    `;

    try {
        const exposicionResult = await db.query(exposicionQuery, [id_exposicion]);
        const preguntasResult = await db.query(preguntasQuery, [id_exposicion]);

        if (exposicionResult.rows.length === 0) {
            return null; // Exposición no encontrada
        }

        const exposicion = exposicionResult.rows[0];
        exposicion.preguntas = preguntasResult.rows; // Agregar preguntas a la exposición
        return exposicion;
    } catch (error) {
        console.error('Error al obtener exposición con preguntas:', error);
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
    getAdminOverview,
    getVisitStats,
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