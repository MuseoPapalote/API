const {db} = require('../database/db')

async function getRandomTrivia(){
    try{
        const query = 'SELECT * FROM preguntatrivia ORDER BY RANDOM() LIMIT 1;';
        const {rows} = await db.query(query);
        return rows[0];
    }catch(error){
        console.error('Error al obtener una pregunta', error);
        throw error;
    }
}

async function getTriviaFromZona(nombre_zona){
    try{
        const zonaaQuery = 'SELECT id_zona FROM zona WHERE nombre_zona = $1;';
        const zona = await db.query(zonaaQuery, [nombre_zona]);
        const query = 'SELECT * FROM preguntatrivia WHERE id_zona = $1;'
        const {rows} = await db.query(query, [zona.rows[0].id_zona]);
        return rows;
    }catch(error){
        console.error('Error al obtener una pregunta', error);
        throw error
    }
}

module.exports = {getRandomTrivia, getTriviaFromZona}