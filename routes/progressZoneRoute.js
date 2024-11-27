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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_zona:
 *                     type: integer
 *                     description: ID de la zona
 *                     example: 4
 *                   nombre_zona:
 *                     type: string
 *                     description: Nombre de la zona
 *                     example: "Pertenezco"
 *                   total_exposiciones_activas:
 *                     type: string
 *                     description: Número total de exposiciones activas en la zona
 *                     example: "1"
 *                   exposiciones_visitadas:
 *                     type: string
 *                     description: Número de exposiciones visitadas por el usuario en esta zona
 *                     example: "0"
 *                   porcentaje_avance:
 *                     type: string
 *                     description: Porcentaje de avance en la zona
 *                     example: "0"
 *       401:
 *         description: No autorizado, el usuario no está autenticado
 *       500:
 *         description: Error interno en el servidor
 */
router.get('/', isAuthenticated, progressZoneController.obtenerProgresoPorUsuario);

/**
 * @swagger
 * /progressZone/stats:
 *   post:
 *     summary: Obtiene estadísticas de progreso por zona específica
 *     description: Retorna estadísticas detalladas del progreso del usuario en una zona específica. El nombre de la zona se envía en el cuerpo de la solicitud.
 *     tags:
 *       - Progreso
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_zona:
 *                 type: string
 *                 description: Nombre de la zona para la cual se desean las estadísticas.
 *                 example: "Zona A"
 *     responses:
 *       200:
 *         description: Estadísticas de progreso en la zona
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_exposiciones_activas:
 *                   type: string
 *                   description: Número total de exposiciones activas en la zona
 *                   example: "4"
 *                 exposiciones_visitadas:
 *                   type: string
 *                   description: Número de exposiciones visitadas por el usuario en esta zona
 *                   example: "2"
 *                 porcentaje_avance:
 *                   type: string
 *                   description: Porcentaje de avance del usuario en esta zona
 *                   example: "50"
 *                 total_visitas_unicas:
 *                   type: string
 *                   description: Número total de visitas únicas realizadas por el usuario en esta zona
 *                   example: "2"
 *                 visitas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_exposicion:
 *                         type: string
 *                         description: Nombre de la exposición visitada
 *                         example: "Mosaicos Griegos"
 *                       fecha_hora_visita:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de la visita
 *                         example: "2024-10-30T01:39:43.913Z"
 *       400:
 *         description: Datos del cuerpo de la solicitud inválidos o faltantes
 *       401:
 *         description: No autorizado, el usuario no está autenticado
 *       500:
 *         description: Error interno en el servidor
 */
router.post('/stats', isAuthenticated, progressZoneController.getStatsPorZona);

module.exports = router;
