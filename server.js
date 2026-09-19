require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/saludo', (_request, response) => {
  response.json({ mensaje: '¡Tu proyecto funciona correctamente! 🚀' });
});

app.get('/api/base-de-datos', async (_request, response) => {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    return response.json({
      conectada: false,
      mensaje: 'Configura el archivo .env cuando quieras conectar MySQL.'
    });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await connection.ping();
    await connection.end();
    return response.json({ conectada: true, mensaje: 'MySQL está conectado.' });
  } catch (error) {
    return response.status(503).json({
      conectada: false,
      mensaje: 'No se pudo conectar con MySQL. Revisa los datos de .env.'
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});

