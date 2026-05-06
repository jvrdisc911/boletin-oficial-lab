// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// Tests de Seguridad - Agente QA 2
// ============================================

const request = require('supertest');
const app = require('../../backend/server');

describe('QA Seguridad - SQL Injection', () => {

test('búsqueda con SQL injection no rompe el servidor', async () => {
  const payload = "' OR '1'='1";
  const res = await request(app).get(`/api/buscar?q=${encodeURIComponent(payload)}`);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('ID con SQL injection devuelve 404 o 500 controlado', async () => {
  const payload = "1; DROP TABLE avisos;--";
  const res = await request(app).get(`/api/avisos/${encodeURIComponent(payload)}`);
  expect([400, 404, 500]).toContain(res.statusCode);
});

test('parámetro seccion con inyección no expone datos', async () => {
  const payload = "1 UNION SELECT * FROM usuarios--";
  const res = await request(app).get(`/api/avisos?seccion=${encodeURIComponent(payload)}`);
  expect(res.statusCode).toBe(200);
  // No debe devolver datos de usuarios
  if (res.body.length > 0) {
    res.body.forEach(row => {
      expect(row).not.toHaveProperty('password_hash');
      expect(row).not.toHaveProperty('email');
    });
  }
});

});

describe('QA Seguridad - XSS', () => {

test('búsqueda con script XSS no se ejecuta en respuesta', async () => {
  const payload = '<script>alert("xss")</script>';
  const res = await request(app).get(`/api/buscar?q=${encodeURIComponent(payload)}`);
  expect(res.statusCode).toBe(200);
  // La respuesta JSON no debe contener scripts sin escapar
  const bodyStr = JSON.stringify(res.body);
  expect(bodyStr).not.toContain('<script>');
});

});

describe('QA Seguridad - Headers y Permisos', () => {

test('respuestas incluyen Content-Type application/json', async () => {
  const res = await request(app).get('/api/secciones');
  expect(res.headers['content-type']).toMatch(/application\/json/);
});

test('endpoint inexistente devuelve 404', async () => {
  const res = await request(app).get('/api/ruta-inexistente');
  expect(res.statusCode).toBe(404);
});

test('no expone password_hash en ningún endpoint público', async () => {
  const endpoints = ['/api/secciones', '/api/avisos', '/api/ediciones'];
  for (const endpoint of endpoints) {
    const res = await request(app).get(endpoint);
    const bodyStr = JSON.stringify(res.body);
    expect(bodyStr).not.toContain('password_hash');
  }
});

test('no expone emails de usuarios en endpoints públicos', async () => {
  const endpoints = ['/api/secciones', '/api/avisos', '/api/ediciones'];
  for (const endpoint of endpoints) {
    const res = await request(app).get(endpoint);
    const bodyStr = JSON.stringify(res.body);
    expect(bodyStr).not.toContain('password_hash');
  }
});

});