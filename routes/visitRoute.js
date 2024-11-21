const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /visit/register:
 *   post:
 *     summary: Registra una visita usando el contenido del QR
 *     description: Registra una visita de un usuario a una exposición usando el contenido del QR en lugar del ID de la exposición.
 *     tags:
 *       - Visitas
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido_qr:
 *                 type: string
 *                 description: Contenido del código QR de la exposición
 *                 example: "QR-12345"
 *     responses:
 *       201:
 *         description: Visita registrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_visita:
 *                   type: integer
 *                   description: ID de la visita registrada
 *                 id_usuario:
 *                   type: integer
 *                   description: ID del usuario que hizo la visita
 *                 id_exposicion:
 *                   type: integer
 *                   description: ID de la exposición visitada
 *                 fecha_visita:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de la visita
 *       404:
 *         description: Exposición no encontrada con el QR proporcionado.
 *       500:
 *         description: Error al registrar la visita.
 */
router.post('/register', isAuthenticated, visitController.registerVisit);

/**
 * @swagger
 * /visit:
 *   get:
 *     summary: Obtiene todas las visitas de un usuario autenticado
 *     description: Retorna una lista de todas las visitas realizadas por el usuario autenticado a exposiciones.
 *     tags:
 *       - Visitas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de visitas del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_visita:
 *                     type: integer
 *                     description: ID de la visita
 *                     example: 1
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario que realizó la visita
 *                     example: 123
 *                   id_exposicion:
 *                     type: integer
 *                     description: ID de la exposición visitada
 *                     example: 456
 *                   nombre_exposicion:
 *                     type: string
 *                     description: Nombre de la exposición visitada
 *                     example: "Arte Egipcio"
 *                   fecha_visita:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de la visita
 *                     example: "2024-11-09T10:15:30Z"
 *       401:
 *         description: No autorizado. El usuario no está autenticado.
 *       500:
 *         description: Error al buscar visitas.
 */
router.get('/', isAuthenticated, visitController.getVisits);

module.exports = router;
