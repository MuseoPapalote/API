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
 *               id_usuario:
 *                 type: integer
 *                 description: ID del usuario
 *               contenido_qr:
 *                 type: string
 *                 description: Contenido del código QR de la exposición
 *     responses:
 *       201:
 *         description: Visita registrada exitosamente
 *       404:
 *         description: Exposición no encontrada con el QR proporcionado
 *       500:
 *         description: Error al registrar la visita
 */
router.post('/register', isAuthenticated, visitController.registerVisit);

module.exports = router;
