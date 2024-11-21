const { db } = require('../database/db');

// Obtener el progreso del usuario en todas las zonas
async function getProgresoPorUsuario(id_usuario) {
    try {
        const query = `
        SELECT 
            Zona.id_zona, 
            Zona.nombre_zona,
            COUNT(DISTINCT CASE WHEN Exposicion.activo = true THEN Exposicion.id_exposicion END) AS total_exposiciones_activas,
            COUNT(DISTINCT CASE WHEN Exposicion.activo = true AND Visita.id_exposicion IS NOT NULL THEN Visita.id_exposicion END) AS exposiciones_visitadas,
            (COUNT(DISTINCT CASE WHEN Exposicion.activo = true AND Visita.id_exposicion IS NOT NULL THEN Visita.id_exposicion END) * 100 / NULLIF(COUNT(DISTINCT CASE WHEN Exposicion.activo = true THEN Exposicion.id_exposicion END), 0)) AS porcentaje_avance
        FROM 
            Zona
        LEFT JOIN 
            Exposicion ON Zona.id_zona = Exposicion.id_zona
        LEFT JOIN 
            Visita ON Exposicion.id_exposicion = Visita.id_exposicion AND Visita.id_usuario = $1  -- Filtramos por usuario
        GROUP BY 
            Zona.id_zona
        ORDER BY 
            Zona.id_zona;
        `;
        const { rows } = await db.query(query, [id_usuario]);
        return rows;
    } catch (error) {
        console.error('Error al obtener el progreso por usuario:', error);
        throw error;
    }
}

async function getStatsPorZona(id_usuario, nombre_zona){
    try{
        const query = `
        SELECT 
            COUNT(DISTINCT CASE WHEN Exposicion.activo = true THEN Exposicion.id_exposicion END) AS total_exposiciones_activas,
            COUNT(DISTINCT CASE WHEN Exposicion.activo = true AND Visita.id_exposicion IS NOT NULL THEN Visita.id_exposicion END) AS exposiciones_visitadas,
            (COUNT(DISTINCT CASE WHEN Exposicion.activo = true AND Visita.id_exposicion IS NOT NULL THEN Visita.id_exposicion END) * 100 / NULLIF(COUNT(DISTINCT CASE WHEN Exposicion.activo = true THEN Exposicion.id_exposicion END), 0)) AS porcentaje_avance        
        FROM 
            Zona
        LEFT JOIN 
            Exposicion ON Zona.id_zona = Exposicion.id_zona
        LEFT JOIN 
            Visita ON Exposicion.id_exposicion = Visita.id_exposicion AND Visita.id_usuario = $1
        WHERE
            Zona.nombre_zona = $2;
        `;
        const { rows } = await db.query(query, [id_usuario, nombre_zona]);
        return rows[0];
    }catch(error){
        console.error('Error al obtener las estadisticas de la zona:', error);
        throw error;
    }
}

module.exports = {
    getProgresoPorUsuario, getStatsPorZona};
