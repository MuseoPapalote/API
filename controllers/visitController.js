const visitModel = require('../models/visitModel');
const expositionModel = require('../models/expositionModel');
const progressZoneModel = require('../models/progressZoneModel');

async function registerVisit(req, res){
    const {id_usuario, id_exposicion} = req.body;
    try{
        const newVisit = await visitModel.registerVisit({id_usuario, id_exposicion});
        res.status(201).send(newVisit);
    } catch(error){
        console.error(error);
        res.status(500).send('Error al registrar visita');
    }
}

module.exports = {registerVisit}