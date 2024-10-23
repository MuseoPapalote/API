const visitModel = require('../models/visitModel');
const expositionModel = require('../models/expositionModel');
const progressZoneModel = require('../models/progressZoneModel');

async function registerVisit(req, res){
    const {id_usuario, id_exposicion} = req.body;
    try{
        await visitModel.registerVisit({id_usuario, id_exposicion});
        zona = await expositionModel.getZoneByExpositionById(id_exposicion);
        console.log(zona);
        exposiciones = await expositionModel.getNumberOfExpositionsByZone(zona[0].id_zona);
        exposicionesVisitadas = await visitModel.getNumberOfVisitsByUser(id_usuario);
        const porcentaje = (exposicionesVisitadas/exposiciones)*100;
        await progressZoneModel.updateProgressZone({id_usuario, id_zona: zona[0].id_zona, exposiciones_visitadas: exposicionesVisitadas, porcentaje_avance: porcentaje});
        res.status(201).send('Visita registrada');
    } catch(error){
        console.error(error);
        res.status(500).send('Error al registrar visita');
    }
}

module.exports = {registerVisit}