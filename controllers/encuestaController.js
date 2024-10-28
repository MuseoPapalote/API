const encuestaModel = require('../models/encuestaModel');

async function createAnswer(req, res){
    try{
        const id_usuario = req.user.id_usuario;
        const {calificacion_general, comentarios} = req.body;
        const answer = await encuestaModel.createAnswer({id_usuario, calificacion_general, comentarios});
        res.status(201).json(answer);
    }catch(error){
        console.error('Error al crear respuesta:', error);
        res.status(500).json({message: error.message});
    }
}

module.exports = {createAnswer}