require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// Función para conectar a la BD
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a MySQL');
    return connection;
  } catch (error) {
    console.error('Error conectando a MySQL:', error);
    process.exit(1);
  }
};

// Registro de usuario
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const db = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO registros (nombre, email, password) VALUES (?, ?, ?)';
    
    const [result] = await db.execute(sql, [nombre, email, hashedPassword]);
    res.json({ message: 'Usuario registrado', id: result.insertId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login y registro de logs
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const db = await connectDB();
    const sql = 'SELECT * FROM registros WHERE email = ?';
    
    const [rows] = await db.execute(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const logSql = 'INSERT INTO logs (email, fecha) VALUES (?, NOW())';
    await db.execute(logSql, [email]);

    res.json({ message: 'Login exitoso' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
