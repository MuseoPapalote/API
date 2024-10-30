const express = require('express');
const router = express.Router();
const respuestaTriviaController = require('../controllers/respuestaTriviaController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /respuestaTrivia:
 *   post:
 *     summary: Enviar respuesta de trivia
 *     description: Permite a un usuario autenticado enviar una respuesta a una pregunta de trivia.
 *     tags:
 *       - Trivia
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pregunta:
 *                 type: integer
 *                 description: ID de la pregunta de trivia
 *                 example: 1
 *               opcion_seleccionada:
 *                 type: integer
 *                 description: Número de la opción seleccionada por el usuario (1, 2, o 3)
 *                 example: 2
 *     responses:
 *       201:
 *         description: Respuesta de trivia registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_respuesta:
 *                   type: integer
 *                   description: ID de la respuesta registrada
 *                 id_usuario:
 *                   type: integer
 *                   description: ID del usuario que envió la respuesta
 *                 id_pregunta:
 *                   type: integer
 *                   description: ID de la pregunta respondida
 *                 opcion_seleccionada:
 *                   type: integer
 *                   description: Opción seleccionada
 *                 es_correcta:
 *                   type: boolean
 *                   description: Indica si la respuesta es correcta
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: No autorizado, el usuario no está autenticado
 */
router.post('/', isAuthenticated, respuestaTriviaController.createRespuestaTrivia);

module.exports = router;
