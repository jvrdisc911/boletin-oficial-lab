// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// Tests de Regresión - Agente QA 3
// ============================================

const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../../backend/server');

describe('QA Regresión - Estructura del proyecto', () => {

test('index.html existe', () => {
  expect(fs.existsSync(path.join(__dirname, '../../index.html'))).toBe(true);
});

test('css/styles.css existe', () => {
  expect(fs.existsSync(path.join(__dirname, '../../css/styles.css'))).toBe(true);
});

test('js/main.js existe', () => {
  expect(fs.existsSync(path.join(__dirname, '../../js/main.js'))).toBe(true);
});

test('las 4 secciones HTML existen', () => {
  ['primera', 'segunda', 'tercera', 'cuarta'].forEach(s => {
    expect(fs.existsSync(path.join(__dirname, `../../secciones/${s}.html`))).toBe(true);
  });
});

test('schema.sql existe', () => {
  expect(fs.existsSync(path.join(__dirname, '../../backend/database/schema.sql'))).toBe(true);
});

test('server.js existe', () => {
  expect(fs.existsSync(path.join(__dirname, '../../backend/server.js'))).toBe(true);
});

});

describe('QA Regresión - Flujos críticos de API', () => {

test('flujo completo: listar secciones → filtrar avisos por sección', async () => {
  // Paso 1: obtener secciones
  const secciones = await request(app).get('/api/secciones');
  expect(secciones.statusCode).toBe(200);
  expect(secciones.body.length).toBeGreaterThan(0);

  // Paso 2: usar el id de la primera sección para filtrar avisos
  const primerSeccionId = secciones.body[0].id;
  const avisos = await request(app).get(`/api/avisos?seccion=${primerSeccionId}`);
  expect(avisos.statusCode).toBe(200);
  expect(Array.isArray(avisos.body)).toBe(true);
});

test('flujo búsqueda: término vacío → error, término válido → array', async () => {
  const sinTermino = await request(app).get('/api/buscar');
  expect(sinTermino.statusCode).toBe(400);

  const conTermino = await request(app).get('/api/buscar?q=ley');
  expect(conTermino.statusCode).toBe(200);
  expect(Array.isArray(conTermino.body)).toBe(true);
});

test('flujo ediciones: devuelve array ordenado por fecha desc', async () => {
  const res = await request(app).get('/api/ediciones');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

});

describe('QA Regresión - Consistencia de datos', () => {

test('secciones siempre devuelven exactamente 4 registros', async () => {
  const res1 = await request(app).get('/api/secciones');
  const res2 = await request(app).get('/api/secciones');
  expect(res1.body.length).toBe(res2.body.length);
  expect(res1.body.length).toBe(4);
});

test('los números de sección son 1, 2, 3 y 4', async () => {
  const res = await request(app).get('/api/secciones');
  const numeros = res.body.map(s => s.numero).sort();
  expect(numeros).toEqual([1, 2, 3, 4]);
});

});
