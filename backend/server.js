// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// Servidor principal - Node.js + Express
// ============================================

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// Conexión a PostgreSQL
const pool = new Pool({
host: process.env.DB_HOST || 'localhost',
port: process.env.DB_PORT || 5432,
database: process.env.DB_NAME || 'boletin_oficial',
user: process.env.DB_USER || 'postgres',
password: process.env.DB_PASSWORD || '',
});

// ---- RUTAS ----

// GET /api/secciones - Lista todas las secciones
app.get('/api/secciones', async (req, res) => {
try {
  const result = await pool.query('SELECT * FROM secciones WHERE activa = TRUE ORDER BY numero');
  res.json(result.rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// GET /api/avisos?seccion=1&fecha=2026-05-06 - Lista avisos por sección y fecha
app.get('/api/avisos', async (req, res) => {
try {
  const { seccion, fecha, categoria } = req.query;
  let query = `
    SELECT a.*, s.nombre as seccion_nombre, c.nombre as categoria_nombre
    FROM avisos a
    JOIN secciones s ON a.seccion_id = s.id
    JOIN categorias c ON a.categoria_id = c.id
    WHERE a.activo = TRUE
  `;
  const params = [];

  if (seccion) {
    params.push(seccion);
    query += ` AND a.seccion_id = $${params.length}`;
  }
  if (fecha) {
    params.push(fecha);
    query += ` AND a.fecha_publicacion = $${params.length}`;
  }
  if (categoria) {
    params.push(categoria);
    query += ` AND a.categoria_id = $${params.length}`;
  }

  query += ' ORDER BY a.fecha_publicacion DESC LIMIT 50';
  const result = await pool.query(query, params);
  res.json(result.rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// GET /api/avisos/:id - Detalle de un aviso
app.get('/api/avisos/:id', async (req, res) => {
try {
  const result = await pool.query(
    'SELECT * FROM avisos WHERE id = $1 AND activo = TRUE',
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Aviso no encontrado' });
  res.json(result.rows[0]);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// GET /api/buscar?q=termino - Búsqueda general
app.get('/api/buscar', async (req, res) => {
try {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Parámetro q requerido' });

  const result = await pool.query(
    `SELECT * FROM avisos
     WHERE activo = TRUE
     AND (titulo ILIKE $1 OR contenido ILIKE $1 OR organismo ILIKE $1)
     ORDER BY fecha_publicacion DESC LIMIT 20`,
    [`%${q}%`]
  );
  res.json(result.rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// GET /api/ediciones - Lista ediciones recientes
app.get('/api/ediciones', async (req, res) => {
try {
  const result = await pool.query(
    'SELECT * FROM ediciones WHERE activa = TRUE ORDER BY fecha DESC LIMIT 30'
  );
  res.json(result.rows);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// Iniciar servidor
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
