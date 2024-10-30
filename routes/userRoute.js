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
 *     description: Permite registrar un usuario con nombre, email y contraseña
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
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: El correo ya está registrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     description: Permite a un usuario iniciar sesión con su email y contraseña
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
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_example"
 *       400:
 *         description: Email o contraseña incorrectos
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /usuarios/delete:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina la cuenta del usuario autenticado
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       401:
 *         description: No autorizado (token no válido o faltante)
 *       500:
 *         description: Error en el servidor
 */
router.delete('/delete', isAuthenticated, userController.deleteUser);

/**
 * @swagger
 * /usuarios/createAdmin:
 *   post:
 *     summary: Crea un usuario administrador
 *     description: Permite a un administrador crear un nuevo usuario con privilegios de administrador
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
 *     responses:
 *       201:
 *         description: Usuario administrador creado exitosamente
 *       403:
 *         description: No autorizado, solo los administradores pueden acceder a este endpoint
 *       500:
 *         description: Error en el servidor
 */
router.post('/createAdmin', isAdmin, userController.createInitialAdmin);

module.exports = router;
