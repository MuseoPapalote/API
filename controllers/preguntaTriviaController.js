const preguntaModel = require('../models/preguntaTriviaModel');

async function getRandomTrivia(req,res){
    try{
        const trivia = await preguntaModel.getRandomTrivia();
        res.status(200).json(trivia);
    }catch(error){
        console.error('Error al obtener una pregunta', error);
        throw error;
    }
}

module.exports = {getRandomTrivia}