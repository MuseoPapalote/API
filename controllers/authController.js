const passport = require('passport');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../models/userModel');
require('dotenv').config();

function generateAccessToken(user){
    return jwt.sign({id_usuario: user.id_usuario, rol: user.rol}, process.env.JWT_SECRET, {expiresIn: '2h'});
}

function generateRefreshToken(user){
    return jwt.sign({id_usuario: user.id_usuario, rol: user.rol}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://museoapi.org/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        try {
            let user = await userModel.findUserByGoogleId(profile.id)
            if(!user){
                const existeUsuario = await userModel.findUserByEmail(profile.emails[0].value);
                if(existeUsuario){
                    return done(null, false, 'El correo ya está registrado')
                };
                user = await userModel.createUserByGoogle({
                    nombre: profile.displayName,
                    email: profile.emails[0].value,
                    google_id: profile.id
                });
            }
            const token = jwt.sign({id_usuario: user.id_usuario}, process.env.JWT_SECRET, {expiresIn: '24h'});
            return done(null,{user, token});
        } catch(error){
            console.log('Error durante la autenticación con Google:', error);
            return done(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'https://museoapi.org/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
    },
    async(accessToken, refreshToken, profile, done) =>{
        try{
            let user = await userModel.findUserByFacebookId(profile.id);
            if(!user){
                const existeUsuario = await userModel.findUserByEmail(profile.emails[0].value);
                if(existeUsuario){
                    return done(null, false, {message: 'El correo ya está registrado'});
                }
                user = await userModel.createUserByFacebook({
                    nombre: profile.displayName,
                    email: profile.emails[0].value,
                    facebook_id: profile.id,
                });
            }

            
            const accessToken = generateAccessToken(user);

            const refreshToken = generateRefreshToken(user);

            await userModel.saveRefreshToken(user.id_usuario, refreshToken);

            const deepLink = 'yourapp://auth/facebook/callback?accessToken=${accessToken}&refreshToken=${refreshToken}';

            return done(null, {accessToken, refreshToken, deepLink});
        } catch(error){
            console.log('Error durante la autenticación con Facebook:', error);
            return done(error);
        }
    }
));

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function loginOrRegisterWithGoogle(req, res) {
    const idToken = req.body.idToken;

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email'];
        const nombre = payload['name'];

        let user = await userModel.findUserByGoogleId(googleId);
        if (!user) {
            const existeUsuario = await userModel.findUserByEmail(email);
            if (existeUsuario) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            user = await userModel.createUserByGoogle({
                nombre: nombre,
                email: email,
                google_id: googleId
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Optionally save the refresh token in the database
        await userModel.saveRefreshToken(user.id_usuario, refreshToken);

        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        return res.status(500).json({ message: 'Error al verificar el token de Google' });
    }
}


module.exports = {loginOrRegisterWithGoogle};