const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(user){
    return jwt.sign({id_usuario: user.id_usuario, rol: user.rol}, process.env.JWT_SECRET, {expiresIn: '15m'});
}

function generateRefreshToken(user){
    return jwt.sign({id_usuario: user.id_usuario, rol: user.rol}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}

async function registerUser(req,res){
    const {nombre, email, password, fecha_nacimiento} = req.body;
    try{
        const existeUsuario = await userModel.findUserByEmail(email);
        if(existeUsuario){
            return res.status(400).send('El correo ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({nombre, email, password: hashedPassword, fecha_nacimiento});
        await userModel.createProgressForuser(newUser.id_usuario);

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        res.status(201).send({accessToken, refreshToken});
    } catch(error){
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
}

async function createInitialAdmin(req,res){
    const {nombre, email, password,rol} = req.body;
    try{
        const existeUsuario = await userModel.findUserByEmail(email);
        if(existeUsuario){
            return res.status(400).send('El correo ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createAdminUser(nombre, email, hashedPassword,rol);
        const token = jwt.sign({id_usuario: newUser.id_usuario}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.status(201).send({token});
    } catch(error){
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const usuario = await userModel.findUserByEmail(email);
        if(!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).send('Correo o contraseña incorrectos');
        }

        const accessToken = generateAccessToken(usuario);
        const refreshToken = generateRefreshToken(usuario);

        await userModel.saveRefreshToken(usuario.id_usuario, refreshToken);

        // Respuesta exitosa con el token
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error en el inicio de sesión del usuario:', error);
        res.status(500).send('Error en el servidor.');
    }
}

async function deleteUser(req, res) {
    try {
        const { id_usuario } = req.user;  // Extraemos el id_usuario del token decodificado

        await userModel.deleteUser(id_usuario);  // Llamamos al modelo para eliminar el usuario
        res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar usuario');
    }
}

async function refreshAccessToken(req,res){
    const {refreshToken} = req.body;
    if(!refreshToken){
        return res.status(403).send('Token no proporcionado');
    }

    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedRefreshToken = await userModel.getRefreshToken(decoded.id_usuario);

        if(storedRefreshToken != refreshToken){
            return res.status(403).json({message: 'Refresh token inválido'});
        }

        const newAccessToken = generateAccessToken(decoded);
        res.status(200).json({accessToken: newAccessToken});

    }catch(error){
        console.error('Error al refrescar el token:', error);
        res.status(500).send('Error al refrescar el token');
    }
}

async function logoutUser(req,res){
    const {refreshToken} = req.body;
    try{
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        await userModel.invalidateRefreshToken(decoded.id_usuario);
        res.status(200).json({message: 'Sesión cerrada correctamente'});
    }catch(error){
        console.error('Error al cerrar sesión:', error);
        res.status(500).send({message:'Error al cerrar sesión'});
    }
}

module.exports = { registerUser, loginUser, deleteUser, createInitialAdmin, refreshAccessToken, logoutUser };