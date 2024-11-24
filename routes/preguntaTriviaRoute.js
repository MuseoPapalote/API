const express = require('express');
const router = express.Router();
const preguntaTriviaController = require('../controllers/preguntaTriviaController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /preguntaTrivia:
 *   get:
 *     summary: Obtiene una pregunta de trivia aleatoria
 *     description: Devuelve una pregunta de trivia seleccionada aleatoriamente para el usuario autenticado.
 *     tags:
 *       - Pregunta Trivia
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Pregunta de trivia obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pregunta:
 *                   type: integer
 *                   description: ID de la pregunta.
 *                   example: 1
 *                 texto_pregunta:
 *                   type: string
 *                   description: Texto de la pregunta.
 *                   example: "¿Cuál es la capital de Francia?"
 *                 opcion_1:
 *                   type: string
 *                   description: Primera opción de respuesta.
 *                   example: "París"
 *                 opcion_2:
 *                   type: string
 *                   description: Segunda opción de respuesta.
 *                   example: "Madrid"
 *                 opcion_3:
 *                   type: string
 *                   description: Tercera opción de respuesta.
 *                   example: "Roma"
 *                 respuesta_correcta:
 *                   type: integer
 *                   description: Número de la opción correcta (1, 2 o 3).
 *                   example: 1
 *       401:
 *         description: No autorizado, el usuario no está autenticado.
 *       500:
 *         description: Error al obtener la pregunta de trivia.
 */
router.get('/', isAuthenticated, preguntaTriviaController.getRandomTrivia);

router.post('/',isAuthenticated, preguntaTriviaController.getTriviaFromZona);

module.exports = router;
