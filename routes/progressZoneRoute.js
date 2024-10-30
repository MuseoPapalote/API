const express = require('express');
const router = express.Router();
const progressZoneController = require('../controllers/progressZoneController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /progressZone:
 *   get:
 *     summary: Obtiene el progreso del usuario en las zonas
 *     description: Retorna el progreso de un usuario autenticado en cada zona, incluyendo el número de exposiciones visitadas y el porcentaje de avance.
 *     tags:
 *       - Progreso
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Progreso del usuario en las zonas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zonas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_zona:
 *                         type: integer
 *                         description: ID de la zona
 *                         example: 1
 *                       nombre_zona:
 *                         type: string
 *                         description: Nombre de la zona
 *                         example: "Zona A"
 *                       exposiciones_visitadas:
 *                         type: integer
 *                         description: Número de exposiciones visitadas por el usuario en esta zona
 *                         example: 3
 *                       total_exposiciones:
 *                         type: integer
 *                         description: Número total de exposiciones en esta zona
 *                         example: 5
 *                       porcentaje_avance:
 *                         type: number
 *                         format: float
 *                         description: Porcentaje de avance en esta zona
 *                         example: 60.0
 *       401:
 *         description: No autorizado, el usuario no está autenticado
 */
router.get('/', isAuthenticated, progressZoneController.obtenerProgresoPorUsuario);

module.exports = router;
