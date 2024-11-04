const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const encuestaController = require('../controllers/encuestaController');
const { isAdmin } = require('../middlewares/isAdmin'); // Middleware de autenticación

// Rutas para el panel de administrador

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Obtiene una vista general de estadísticas administrativas
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de vista general para administración
 *       401:
 *         description: No autorizado, el usuario no tiene acceso de administrador
 */
router.get('/overview', isAdmin, adminController.getAdminOverview);

/**
 * @swagger
 * /admin/visitstats:
 *   get:
 *     summary: Obtiene estadísticas de visitas para zonas y exposiciones
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de estadísticas de visitas
 *       401:
 *         description: No autorizado, el usuario no tiene acceso de administrador
 */
router.get('/visitstats', isAdmin, adminController.getVisitStats);

/**
 * @swagger
 * /admin/emails:
 *   get:
 *     summary: Obtiene una lista de correos electrónicos de todos los usuarios
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de correos electrónicos de los usuarios
 *       401:
 *         description: No autorizado, el usuario no tiene acceso de administrador
 */
router.get('/emails', isAdmin, adminController.getUserEmails);

// Rutas para encuestas de satisfacción

/**
 * @swagger
 * /admin/encuestas:
 *   get:
 *     summary: Obtiene los resultados de las encuestas de satisfacción
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Resultados de encuestas de satisfacción
 *       401:
 *         description: No autorizado, el usuario no tiene acceso de administrador
 */
router.get('/encuestas', isAdmin, encuestaController.getEncuestaResultados);

/**
 * @swagger
 * /admin/marcarRespondido/{id_encuesta}:
 *   put:
 *     summary: Marca una encuesta como respondida por el administrador
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_encuesta
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la encuesta a marcar como respondida
 *     responses:
 *       200:
 *         description: Encuesta marcada como respondida
 *       401:
 *         description: No autorizado, el usuario no tiene acceso de administrador
 *       404:
 *         description: Encuesta no encontrada
 */
router.put('/marcarRespondido/:id_encuesta', isAdmin, encuestaController.marcarComentarioRespondido);

// Rutas para zonas
/**
 * @swagger
 * /admin/zonas:
 *   get:
 *     summary: Obtiene todas las zonas
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las zonas
 */
router.get('/zonas', isAdmin, adminController.getAllZonas);

/**
 * @swagger
 * /admin/zonas/{id_zona}:
 *   get:
 *     summary: Obtiene una zona por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona a obtener
 *     responses:
 *       200:
 *         description: Información de la zona especificada
 */
router.get('/zonas/:id_zona', isAdmin, adminController.getZonaById);

/**
 * @swagger
 * /admin/zonas:
 *   post:
 *     summary: Crea una nueva zona
 *     tags:
 *       - Administración
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
 *                 example: "Zona A"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la zona"
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 */
router.post('/zonas', isAdmin, adminController.createZona);

/**
 * @swagger
 * /admin/zonas/{id_zona}:
 *   put:
 *     summary: Edita una zona existente
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_zona:
 *                 type: string
 *                 example: "Zona B"
 *               descripcion:
 *                 type: string
 *                 example: "Nueva descripción de la zona"
 *     responses:
 *       200:
 *         description: Zona actualizada exitosamente
 */
router.put('/zonas/:id_zona', isAdmin, adminController.editZona);

/**
 * @swagger
 * /admin/zonas/{id_zona}:
 *   delete:
 *     summary: Elimina una zona por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona a eliminar
 *     responses:
 *       200:
 *         description: Zona eliminada exitosamente
 */
router.delete('/zonas/:id_zona', isAdmin, adminController.deleteZona);

// Rutas para exposiciones
/**
 * @swagger
 * /admin/exposiciones:
 *   get:
 *     summary: Obtiene todas las exposiciones
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las exposiciones
 */
router.get('/exposiciones', isAdmin, adminController.getAllExposiciones);

/**
 * @swagger
 * /admin/exposiciones/{id_exposicion}:
 *   get:
 *     summary: Obtiene una exposición por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_exposicion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la exposición a obtener
 *     responses:
 *       200:
 *         description: Información de la exposición especificada
 */
router.get('/exposiciones/:id_exposicion', isAdmin, adminController.getExposicionById);

/**
 * @swagger
 * /admin/exposiciones:
 *   post:
 *     summary: Crea una nueva exposición
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_exposicion:
 *                 type: string
 *                 example: "Exposición A"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción de la exposición"
 *               id_zona:
 *                 type: integer
 *                 example: 1
 *               codigo_qr:
 *                 type: string
 *                 example: "QR-12345"
 *     responses:
 *       201:
 *         description: Exposición creada exitosamente
 */
router.post('/exposiciones', isAdmin, adminController.createExposicion);

/**
 * @swagger
 * /admin/exposiciones/{id_exposicion}:
 *   put:
 *     summary: Edita una exposición existente
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_exposicion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la exposición a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_exposicion:
 *                 type: string
 *                 example: "Exposición B"
 *               descripcion:
 *                 type: string
 *                 example: "Nueva descripción de la exposición"
 *               codigo_qr:
 *                 type: string
 *                 example: "QR-54321"
 *     responses:
 *       200:
 *         description: Exposición actualizada exitosamente
 */
router.put('/exposiciones/:id_exposicion', isAdmin, adminController.editExposicion);

/**
 * @swagger
 * /admin/exposiciones/{id_exposicion}:
 *   delete:
 *     summary: Elimina una exposición por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_exposicion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la exposición a eliminar
 *     responses:
 *       200:
 *         description: Exposición eliminada exitosamente
 */
router.delete('/exposiciones/:id_exposicion', isAdmin, adminController.deleteExposicion);

// Rutas para preguntas
/**
 * @swagger
 * /admin/preguntas:
 *   get:
 *     summary: Obtiene todas las preguntas
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las preguntas
 */
router.get('/preguntas', isAdmin, adminController.getAllPreguntas);

/**
 * @swagger
 * /admin/preguntas/{id_pregunta}:
 *   get:
 *     summary: Obtiene una pregunta por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pregunta
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pregunta a obtener
 *     responses:
 *       200:
 *         description: Información de la pregunta especificada
 */
router.get('/preguntas/:id_pregunta', isAdmin, adminController.getPreguntaById);

/**
 * @swagger
 * /admin/preguntas:
 *   post:
 *     summary: Crea una nueva pregunta
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_exposicion:
 *                 type: integer
 *               texto_pregunta:
 *                 type: string
 *                 example: "¿Cuál es la capital de Francia?"
 *               respuesta_correcta:
 *                 type: integer
 *                 example: 1
 *               opcion1:
 *                 type: string
 *                 example: "París"
 *               opcion2:
 *                 type: string
 *                 example: "Madrid"
 *               opcion3:
 *                 type: string
 *                 example: "Roma"
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 */
router.post('/preguntas', isAdmin, adminController.createPregunta);

/**
 * @swagger
 * /admin/preguntas/{id_pregunta}:
 *   put:
 *     summary: Edita una pregunta existente
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pregunta
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pregunta a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto_pregunta:
 *                 type: string
 *                 example: "¿Cuál es la capital de Italia?"
 *               respuesta_correcta:
 *                 type: integer
 *                 example: 2
 *               opcion1:
 *                 type: string
 *                 example: "Milán"
 *               opcion2:
 *                 type: string
 *                 example: "Roma"
 *               opcion3:
 *                 type: string
 *                 example: "Venecia"
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 */
router.put('/preguntas/:id_pregunta', isAdmin, adminController.editPregunta);

/**
 * @swagger
 * /admin/preguntas/{id_pregunta}:
 *   delete:
 *     summary: Elimina una pregunta por su ID
 *     tags:
 *       - Administración
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pregunta
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la pregunta a eliminar
 *     responses:
 *       200:
 *         description: Pregunta eliminada exitosamente
 */
router.delete('/preguntas/:id_pregunta', isAdmin, adminController.deletePregunta);

module.exports = router;
