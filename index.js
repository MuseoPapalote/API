require('dotenv').config(); // Load environment variables at the top
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8080;
app.use(bodyParser.json());


app.listen(
    PORT,
    () => console.log(`running this shit on http://localhost:${PORT}`)    
)

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwordexample',
    database: 'papaloteDB',
    port: '3306'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/usuarios', (req, res) => {
    const { nombre, correo, password_hashed } = req.body;

    if (!nombre || !correo || !password_hashed) {
        return res.status(400).send('Todos los campos son obligatorios: nombre, correo, contraseña (hashed)');
    }

    const query = 'INSERT INTO Usuarios (nombre_usuario, correo_electronico, password_hashed) VALUES (?, ?, ?)';

    db.query(query, [nombre, correo, password_hashed], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar usuario');
        }
        res.status(201).send('Usuario creado correctamente');
    });
});
