
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json());

// Conexion con MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    });
});

// Obtener todos los alumnos
app.get('/api/alumnos', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM alumnos'
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Obtener alumno por correo
app.get('/api/alumnos/correo/:correo', async (req, res) => {
    try {
        const { correo } = req.params;

        const [rows] = await db.execute(
            'SELECT * FROM alumnos WHERE correo = ?',
            [correo]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Registrar un alumno
app.post('/api/alumnos', async (req, res) => {
    try {
        const { nombre, correo, carrera } = req.body;

        if (!nombre || !correo || !carrera) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const [result] = await db.execute(
            'INSERT INTO alumnos (nombre, correo, carrera) VALUES (?, ?, ?)',
            [nombre, correo, carrera]
        );

        res.status(201).json({
            mensaje: 'Alumno registrado correctamente',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API ejecutandose en puerto ${PORT}`);
});
