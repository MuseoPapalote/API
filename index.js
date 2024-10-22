const express = require('express');
const bodyParser = require('body-parser');
const sesion = require('express-session');
const passport = require('passport');
var cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables at the top

const app = express();
const PORT = 8080;

const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sesion({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.get('/dashboard',(req,res) => {
    if(req.isAuthenticated()){
        res.send(`Bienvenido al dashboard ,${req.user.nombre}`);
    } else {
        res.redirect('/');
    }
});

app.listen(
    PORT,
    () => console.log(`Example app listening at http://localhost:${PORT}`)    
)
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'passwordexample',
//     database: 'papaloteDB',
//     port: '3306'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Conectado a la base de datos MySQL');
// });

// app.post('/usuarios', (req, res) => {
//     const { nombre, correo, password_hashed } = req.body;

//     if (!nombre || !correo || !password_hashed) {
//         return res.status(400).send('Todos los campos son obligatorios: nombre, correo, contraseña (hashed)');
//     }

//     const query = 'INSERT INTO Usuarios (nombre_usuario, correo_electronico, password_hashed) VALUES (?, ?, ?)';

//     db.query(query, [nombre, correo, password_hashed], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error al insertar usuario');
//         }
//         res.status(201).send('Usuario creado correctamente');
//     });
// });
