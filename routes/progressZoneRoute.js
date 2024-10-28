const express = require('express');
const router = express.Router();
const progressZoneController = require('../controllers/progressZoneController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, progressZoneController.obtenerProgresoPorUsuario);

module.exports = router;