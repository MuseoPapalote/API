const respuestaTriviaModel = require('../models/respuestaTriviaModel');

async function createRespuestaTrivia(req, res){
    const id_usuario = req.user.id_usuario;
    const {id_pregunta, opcion_seleccionada} = req.body;
    try {
        const nuevaRespuesta = await respuestaTriviaModel.createRespuestaTrivia(id_pregunta, id_usuario, opcion_seleccionada);
        res.status(201).json({message: 'Respuesta creada exitosamente', respuesta: nuevaRespuesta});
    } catch (error) {
        console.error('Error al crear respuesta:', error);
        res.status(500).json({message: 'Error al crear respuesta'});
    }
}

async function getUserRespuestaTriviaAnswers(req, res){
    const id_usuario = req.user.id_usuario;
    try{
        const respuestas = await respuestaTriviaModel.getUserRespuestaTriviaAnswers(id_usuario);
        res.status(200).json(respuestas);
    }catch(error){
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({message: 'Error al obtener respuestas'});
    }
}

module.exports = {createRespuestaTrivia, getUserRespuestaTriviaAnswers};