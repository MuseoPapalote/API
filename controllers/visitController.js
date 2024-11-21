const visitModel = require('../models/visitModel');

async function registerVisit(req, res){
    const id_usuario = req.user.id_usuario;
    const {contenido_qr} = req.body;
    try{
        const exposition = await visitModel.findExposicionByQr(contenido_qr);
        if(!exposition){
            return res.status(404).send('Exposición no encontrada con el código QR proporcionado');
        }

        const id_exposicion = exposition.id_exposicion;

        const newVisit = await visitModel.registerVisit({id_usuario, id_exposicion});
        res.status(201).send(newVisit);
    } catch(error){
        console.error(error);
        res.status(500).send('Error al registrar visita');
    }
}

async function getVisits(req,res){
    try{
        const id_usuario = req.user.id_usuario;
        const visits = await visitModel.getVisits(id_usuario);
        res.send(visits);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al buscar visitas');
    }
}

module.exports = {registerVisit, getVisits};