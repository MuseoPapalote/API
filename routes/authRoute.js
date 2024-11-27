const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Autenticación con Google
 *     description: Inicia el flujo de autenticación con Google.
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirige al flujo de autenticación de Google
 */
router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email'], session: false})
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback de autenticación de Google
 *     description: Callback al que Google redirige tras la autenticación. Devuelve un token JWT y los datos del usuario autenticado.
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Retorna el token y los datos del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Datos del usuario autenticado
 *                 token:
 *                   type: string
 *                   description: Token JWT para la sesión
 */
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/', session: false}),
    (req, res) => {
        const {user, token} = req.user;
        res.json({user, token});
        res.redirect('/dashboard');
    }
);

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Autenticación con Facebook
 *     description: Inicia el flujo de autenticación con Facebook.
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirige al flujo de autenticación de Facebook
 */
router.get('/facebook',
    passport.authenticate('facebook', {scope: ['email'], session: false})
);

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Callback de autenticación de Facebook
 *     description: Callback al que Facebook redirige tras la autenticación. Devuelve un token JWT y los datos del usuario autenticado.
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Retorna el token y los datos del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Datos del usuario autenticado
 *                 token:
 *                   type: string
 *                   description: Token JWT para la sesión
 */
router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/', session: false}),
    (req, res) => {
        const {accessToken, refreshToken, deepLink} = req.user;
        res.redirect(deepLink);
    }
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: Finaliza la sesión del usuario y redirige a la página principal.
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirige a la página principal después de cerrar sesión
 */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**
 * @swagger
 * /auth/google/mobile:
 *   post:
 *     summary: Login/Register con Google desde la app móvil
 *     description: Verifica el ID Token enviado desde la app móvil, registra un nuevo usuario si no existe o inicia sesión si ya está registrado.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: ID Token proporcionado por Google Sign-In
 *     responses:
 *       200:
 *         description: Login o registro exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Error en la solicitud (e.g., el correo ya está registrado)
 *       500:
 *         description: Error interno del servidor
 */
router.post('/google/mobile', authController.loginOrRegisterWithGoogle);


module.exports = router;
