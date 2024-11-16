const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Permite registrar un usuario con nombre, email, contraseña y fecha de nacimiento.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente con tokens generados.
 *       400:
 *         description: El correo ya está registrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     description: Permite a un usuario iniciar sesión con su email y contraseña. Genera tokens de acceso y refresco.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso con tokens de acceso y refresco.
 *       401:
 *         description: Correo o contraseña incorrectos.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /usuarios/delete:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina la cuenta del usuario autenticado.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *       401:
 *         description: No autorizado (token no válido o faltante).
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/delete', isAuthenticated, userController.deleteUser);

/**
 * @swagger
 * /usuarios/createAdmin:
 *   post:
 *     summary: Crea un usuario administrador
 *     description: Permite a un administrador crear un nuevo usuario con privilegios de administrador.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Admin Nuevo"
 *               email:
 *                 type: string
 *                 example: "admin.nuevo@example.com"
 *               password:
 *                 type: string
 *                 example: "adminpassword123"
 *               rol:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Usuario administrador creado exitosamente.
 *       403:
 *         description: No autorizado, solo los administradores pueden acceder a este endpoint.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/createAdmin', isAdmin, userController.createInitialAdmin);

/**
 * @swagger
 * /usuarios/token:
 *   post:
 *     summary: Genera un nuevo token de acceso
 *     description: Genera un nuevo token de acceso usando un token de refresco.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "refresh_token_example"
 *     responses:
 *       200:
 *         description: Nuevo token de acceso generado.
 *       403:
 *         description: Token de refresco inválido o no proporcionado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/token', userController.refreshAccessToken);

/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     summary: Cierra sesión del usuario
 *     description: Invalida el token de refresco y cierra sesión del usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "refresh_token_example"
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 *       500:
 *         description: Error al cerrar sesión.
 */
router.post('/logout', userController.logoutUser);

/**
 * @swagger
 * /usuarios/profile:
 *   get:
 *     summary: Obtiene la información del perfil del usuario autenticado
 *     description: Obtiene detalles de perfil para el usuario autenticado.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Información del perfil obtenida exitosamente.
 *       500:
 *         description: Error al obtener la información del perfil.
 */
router.get('/profile', isAuthenticated, userController.getUserInfo);

/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Actualiza el email y la contraseña del usuario autenticado
 *     description: Permite a un usuario actualizar su email y contraseña.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nuevo.correo@example.com"
 *               password:
 *                 type: string
 *                 example: "nuevaPassword123"
 *     responses:
 *       200:
 *         description: Datos actualizados correctamente.
 *       500:
 *         description: Error en el servidor al actualizar los datos del usuario.
 */
router.put('/',isAuthenticated,userController.updateUserEmailAndPassword);

module.exports = router;
