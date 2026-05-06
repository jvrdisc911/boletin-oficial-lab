// Boletín Oficial - Laboratorio de Informática
// main.js - Lógica principal del frontend

document.addEventListener('DOMContentLoaded', function () {

// Búsqueda básica
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
    if (e.key === 'Enter') {
      btnBuscar.click();
    }
  });
}

});