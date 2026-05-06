// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// Script de carga de contenido
// Equipo Contenido
// ============================================

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
host: process.env.DB_HOST || 'localhost',
port: process.env.DB_PORT || 5432,
database: process.env.DB_NAME || 'boletin_oficial',
user: process.env.DB_USER || 'postgres',
password: process.env.DB_PASSWORD || '',
});

async function cargarContenido() {
const client = await pool.connect();

try {
  console.log('🔄 Iniciando carga de contenido...');

  const sqlPath = path.join(__dirname, '../datos/normativas.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  await client.query('BEGIN');
  await client.query(sql);
  await client.query('COMMIT');

  console.log('✅ Contenido cargado exitosamente.');

  const result = await client.query('SELECT COUNT(*) FROM avisos');
  console.log(`📋 Total de avisos en la base: ${result.rows[0].count}`);

  const porSeccion = await client.query(`
    SELECT s.nombre, COUNT(a.id) as total
    FROM secciones s
    LEFT JOIN avisos a ON a.seccion_id = s.id
    GROUP BY s.nombre, s.numero
    ORDER BY s.numero
  `);

  console.log('\n📊 Avisos por sección:');
  porSeccion.rows.forEach(row => {
    console.log(`  ${row.nombre}: ${row.total} avisos`);
  });

} catch (err) {
  await client.query('ROLLBACK');
  console.error('❌ Error al cargar contenido:', err.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
}

cargarContenido();
