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

module.exports = {getRandomTrivia}