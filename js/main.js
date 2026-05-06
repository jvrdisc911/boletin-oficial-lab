// ============================================
// BOLETÍN OFICIAL - Laboratorio de Informática
// main.js - Lógica principal del frontend
// Conectado con API backend
// ============================================

const API_BASE = `http://${window.location.hostname}:3000/api`;

document.addEventListener('DOMContentLoaded', function () {

// ---- BUSCADOR ----
const btnBuscar = document.querySelector('.busqueda button');
const inputBuscar = document.querySelector('.busqueda input');

if (btnBuscar && inputBuscar) {
  btnBuscar.addEventListener('click', function () {
    const termino = inputBuscar.value.trim();
    if (termino) {
      window.location.href = `busqueda.html?q=${encodeURIComponent(termino)}`;
    }
  });

  inputBuscar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') btnBuscar.click();
  });
}

// ---- CARGA DE AVISOS POR SECCIÓN ----
const main = document.querySelector('main[data-seccion]');
if (main) {
  const seccionId = main.getAttribute('data-seccion');
  cargarAvisos(seccionId);
}

// ---- PÁGINA DE BÚSQUEDA ----
const params = new URLSearchParams(window.location.search);
const q = params.get('q');
if (q && document.getElementById('resultados-busqueda')) {
  buscar(q);
}

});

// ---- FUNCIONES DE API ----

async function cargarAvisos(seccionId) {
const contenedor = document.getElementById('listado-avisos') ||
                   document.querySelector('.listado-principal');
if (!contenedor) return;

contenedor.innerHTML = '<p class="cargando">Cargando avisos...</p>';

try {
  const res = await fetch(`${API_BASE}/avisos?seccion=${seccionId}`);
  if (!res.ok) throw new Error('Error al obtener avisos');
  const avisos = await res.json();

  if (avisos.length === 0) {
    contenedor.innerHTML = '<p class="sin-resultados">No hay avisos publicados hoy.</p>';
    return;
  }

  contenedor.innerHTML = avisos.map(aviso => renderAviso(aviso)).join('');

} catch (err) {
  contenedor.innerHTML = `<p class="error">No se pudo conectar con el servidor. <br><small>${err.message}</small></p>`;
}
}

async function buscar(termino) {
const contenedor = document.getElementById('resultados-busqueda');
if (!contenedor) return;

contenedor.innerHTML = `<p class="cargando">Buscando "<strong>${termino}</strong>"...</p>`;

try {
  const res = await fetch(`${API_BASE}/buscar?q=${encodeURIComponent(termino)}`);
  if (!res.ok) throw new Error('Error en la búsqueda');
  const resultados = await res.json();

  const titulo = document.getElementById('titulo-busqueda');
  if (titulo) titulo.textContent = `Resultados para: "${termino}" (${resultados.length})`;

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="sin-resultados">No se encontraron resultados.</p>';
    return;
  }

  contenedor.innerHTML = resultados.map(aviso => renderAviso(aviso)).join('');

} catch (err) {
  contenedor.innerHTML = `<p class="error">Error al realizar la búsqueda. <br><small>${err.message}</small></p>`;
}
}

async function cargarDetalle(avisoId) {
const contenedor = document.getElementById('detalle-aviso');
if (!contenedor) return;

try {
  const res = await fetch(`${API_BASE}/avisos/${avisoId}`);
  if (res.status === 404) {
    contenedor.innerHTML = '<p class="error">Aviso no encontrado.</p>';
    return;
  }
  const aviso = await res.json();
  contenedor.innerHTML = renderAvisoDetalle(aviso);

} catch (err) {
  contenedor.innerHTML = `<p class="error">No se pudo cargar el aviso.<br><small>${err.message}</small></p>`;
}
}

// ---- TEMPLATES HTML ----

function renderAviso(aviso) {
const fecha = new Date(aviso.fecha_publicacion).toLocaleDateString('es-AR', {
  day: '2-digit', month: 'long', year: 'numeric'
});
return `
  <article class="aviso-item">
    <div class="aviso-meta">
      <span class="aviso-categoria">${aviso.categoria_nombre || ''}</span>
      <span class="aviso-numero">${aviso.numero_aviso || ''}</span>
      <span class="aviso-fecha">${fecha}</span>
    </div>
    <h3 class="aviso-titulo">
      <a href="detalle.html?id=${aviso.id}">${aviso.titulo}</a>
    </h3>
    <p class="aviso-organismo">${aviso.organismo || ''}</p>
    <p class="aviso-resumen">${aviso.contenido.substring(0, 200)}...</p>
    <a href="detalle.html?id=${aviso.id}" class="btn-ver-mas">Ver aviso completo →</a>
  </article>
`;
}

function renderAvisoDetalle(aviso) {
const fecha = new Date(aviso.fecha_publicacion).toLocaleDateString('es-AR', {
  day: '2-digit', month: 'long', year: 'numeric'
});
return `
  <div class="aviso-detalle">
    <div class="aviso-meta">
      <span class="aviso-numero">${aviso.numero_aviso || ''}</span>
      <span class="aviso-fecha">${fecha}</span>
    </div>
    <h1 class="aviso-titulo">${aviso.titulo}</h1>
    <p class="aviso-organismo"><strong>Organismo:</strong> ${aviso.organismo || '-'}</p>
    <div class="aviso-contenido">${aviso.contenido}</div>
    <a href="javascript:history.back()" class="btn">← Volver</a>
  </div>
`;
}
