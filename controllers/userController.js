const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const {nombre, email, password} = req.body;
    try{
        const existeUsuario = await userModel.findUserByEmail(email);
        if(existeUsuario){
            return res.status(400).send('El correo ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({nombre, email, password: hashedPassword});
        await userModel.createProgressForuser(newUser.id_usuario);
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
        if (!usuario) {
            return res.status(400).json({ message: 'Email no registrado.' });
        }

        // Verificar la contraseña
        const esPasswordValido = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respuesta exitosa con el token
        res.status(200).json({ token });
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

module.exports = { registerUser, loginUser, deleteUser };