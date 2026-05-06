// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// Tests Funcionales - Agente QA 1
// ============================================

const request = require('supertest');
const app = require('../../backend/server');

describe('QA Funcional - APIs', () => {

// Test 1: Secciones
describe('GET /api/secciones', () => {
  test('devuelve las 4 secciones', async () => {
    const res = await request(app).get('/api/secciones');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  test('cada sección tiene id, numero y nombre', async () => {
    const res = await request(app).get('/api/secciones');
    res.body.forEach(seccion => {
      expect(seccion).toHaveProperty('id');
      expect(seccion).toHaveProperty('numero');
      expect(seccion).toHaveProperty('nombre');
    });
  });
});

// Test 2: Avisos
describe('GET /api/avisos', () => {
  test('responde con status 200', async () => {
    const res = await request(app).get('/api/avisos');
    expect(res.statusCode).toBe(200);
  });

  test('filtra por sección correctamente', async () => {
    const res = await request(app).get('/api/avisos?seccion=1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Test 3: Búsqueda
describe('GET /api/buscar', () => {
  test('requiere parámetro q', async () => {
    const res = await request(app).get('/api/buscar');
    expect(res.statusCode).toBe(400);
  });

  test('devuelve resultados con término válido', async () => {
    const res = await request(app).get('/api/buscar?q=decreto');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Test 4: Aviso por ID
describe('GET /api/avisos/:id', () => {
  test('devuelve 404 para ID inexistente', async () => {
    const res = await request(app).get('/api/avisos/99999');
    expect(res.statusCode).toBe(404);
  });
});

// Test 5: Ediciones
describe('GET /api/ediciones', () => {
  test('responde con status 200', async () => {
    const res = await request(app).get('/api/ediciones');
    expect(res.statusCode).toBe(200);
  });

  test('devuelve un array', async () => {
    const res = await request(app).get('/api/ediciones');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

});

describe('QA Funcional - HTML', () => {

test('index.html existe y tiene las 4 secciones', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
  expect(html).toContain('Primera Sección');
  expect(html).toContain('Segunda Sección');
  expect(html).toContain('Tercera Sección');
  expect(html).toContain('Cuarta Sección');
});

test('index.html tiene buscador', () => {
  const fs = require('fs');
  const path = require('path');
  const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
  expect(html).toContain('busqueda');
  expect(html).toContain('Buscar');
});

test('todas las secciones HTML existen', () => {
  const fs = require('fs');
  const path = require('path');
  const secciones = ['primera', 'segunda', 'tercera', 'cuarta'];
  secciones.forEach(s => {
    const filePath = path.join(__dirname, `../../secciones/${s}.html`);
    expect(fs.existsSync(filePath)).toBe(true);
  });
});

});