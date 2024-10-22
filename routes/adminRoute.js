const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/isAdmin'); // Middleware de autenticación

// Rutas para zonas
router.get('/zonas', isAdmin, adminController.getAllZonas);
router.get('/zonas/:id_zona', isAdmin, adminController.getZonaById);
router.post('/zonas', isAdmin, adminController.createZona);
router.put('/zonas/:id_zona', isAdmin, adminController.editZona);
router.delete('/zonas/:id_zona', isAdmin, adminController.deleteZona);

// Rutas para exposiciones
router.get('/exposiciones', isAdmin, adminController.getAllExposiciones);
router.get('/exposiciones/:id_exposicion', isAdmin, adminController.getExposicionById);
router.post('/exposiciones', isAdmin, adminController.createExposicion);
router.put('/exposiciones/:id_exposicion', isAdmin, adminController.editExposicion);
router.delete('/exposiciones/:id_exposicion', isAdmin, adminController.deleteExposicion);

// Rutas para preguntas
router.get('/preguntas', isAdmin, adminController.getAllPreguntas);
router.get('/preguntas/:id_pregunta', isAdmin, adminController.getPreguntaById);
router.post('/preguntas', isAdmin, adminController.createPregunta);
router.put('/preguntas/:id_pregunta', isAdmin, adminController.editPregunta);
router.delete('/preguntas/:id_pregunta', isAdmin, adminController.deletePregunta);

module.exports = router;
