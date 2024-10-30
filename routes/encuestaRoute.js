const express = require('express');
const router = express.Router();
const encuestaController = require('../controllers/encuestaController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /encuesta:
 *   post:
 *     summary: Crea una nueva respuesta para la encuesta de satisfacción
 *     description: Registra una respuesta de un usuario autenticado para la encuesta de satisfacción.
 *     tags:
 *       - Encuesta
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID del usuario que responde la encuesta
 *               calificacion_general:
 *                 type: integer
 *                 description: Calificación general de la encuesta (1-5)
 *                 example: 4
 *               comentarios:
 *                 type: string
 *                 description: Comentarios adicionales del usuario
 *                 example: "Excelente experiencia."
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Respuesta a la encuesta creada exitosamente."
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *       401:
 *         description: No autorizado, el usuario no está autenticado
 */
router.post('/', isAuthenticated, encuestaController.createAnswer);

module.exports = router;
