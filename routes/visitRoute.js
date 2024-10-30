const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /visit/register:
 *   post:
 *     summary: Registra una visita a una exposición
 *     description: Permite a un usuario registrar su visita a una exposición específica en el museo
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
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *                 description: ID del usuario que registra la visita
 *               id_exposicion:
 *                 type: integer
 *                 example: 10
 *                 description: ID de la exposición que el usuario está visitando
 *     responses:
 *       200:
 *         description: Visita registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Visita registrada exitosamente"
 *       400:
 *         description: Error en la solicitud (por ejemplo, datos faltantes o inválidos)
 *       401:
 *         description: No autorizado. El usuario no está autenticado
 *       500:
 *         description: Error en el servidor
 */
router.post('/register', isAuthenticated, visitController.registerVisit);

module.exports = router;
