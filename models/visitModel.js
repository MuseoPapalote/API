const {db} = require('../database/db');

async function registerVisit({id_usuario, id_exposicion}){
    try{
        const query = 'INSERT INTO visita (id_usuario, id_exposicion,fecha_hora_visita) VALUES ($1, $2, NOW()) RETURNING *;';
        const {rows} = await db.query(query, [id_usuario, id_exposicion]);
        return rows[0];
    } catch(error){
        console.error('Error al registrar visita:', error);
        throw error;
    }
}

async function findExposicionByQr(codigo_qr){
    try{
        const query = 'SELECT * FROM exposicion WHERE codigo_qr = $1;';
        const {rows} = await db.query(query, [codigo_qr]);
        return rows[0];
    } catch(error){
        console.error('Error al buscar exposición por QR:', error);
        throw error;
    }
}

module.exports = {registerVisit,findExposicionByQr}