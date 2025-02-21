require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lalo',
  database: 'usuarios'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Guardar registros
app.post('/registro', (req, res) => {
  const { nombre, email, password } = req.body;
  const sql = 'INSERT INTO registros (nombre, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario registrado', id: result.insertId });
  });
});

// Guardar logs de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM registros WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length > 0) {
      const logSql = 'INSERT INTO logs (email, fecha) VALUES (?, NOW())';
      db.query(logSql, [email], (logErr) => {
        if (logErr) return res.status(500).json({ error: logErr.message });
        res.json({ message: 'Login exitoso' });
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
