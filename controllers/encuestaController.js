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

async function getEncuestaResultados(req, res) {
    try {
        const result = await encuestaModel.getEncuestaResultados();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener resultados de encuesta:', error);
        res.status(500).json({message: error.message});
    }
}

async function marcarComentarioRespondido(req, res) {
    const { id_encuesta } = req.params;

    try {
        const resultado = await encuestaModel.marcarComentarioRespondido(id_encuesta);
        if (!resultado) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }
        res.json({ message: 'Comentario marcado como respondido', encuesta: resultado });
    } catch (error) {
        console.error('Error al marcar comentario como respondido:', error);
        res.status(500).send('Error al actualizar estado de respuesta');
    }
}

module.exports = {createAnswer, getEncuestaResultados, marcarComentarioRespondido};