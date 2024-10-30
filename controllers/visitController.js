const visitModel = require('../models/visitModel');
const expositionModel = require('../models/expositionModel');
const progressZoneModel = require('../models/progressZoneModel');

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

module.exports = {registerVisit}