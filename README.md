# Boletín Oficial - Laboratorio de Informática

Réplica del sitio [boletinoficial.gov.ar](http://www.boletinoficial.gov.ar) desarrollada como laboratorio de informática.

## Estructura del proyecto

```
boletin-oficial-lab/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   └── main.js             # Lógica frontend
├── secciones/
│   ├── primera.html        # Legislación y Avisos Oficiales
│   ├── segunda.html        # Sociedades y Avisos Judiciales
│   ├── tercera.html        # Contrataciones
│   └── cuarta.html         # Dominios de Internet
└── README.md
```

## Equipos de trabajo

| Rama | Equipo | Responsabilidad |
|------|--------|----------------|
| `equipo-frontend` | Frontend | HTML, CSS, JS |
| `equipo-backend` | Backend | APIs, PostgreSQL |
| `equipo-qa` | QA | Testing funcional, seguridad, regresión |
| `equipo-contenido` | Contenido | Carga de normativas y avisos |

## Flujo de trabajo

1. Cada equipo trabaja en su rama
2. QA revisa cambios antes de mergear a `main`
3. Reporte de QA se envía por email automáticamente
4. Solo se mergea a `main` si QA aprueba ✅

## Stack tecnológico

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** PostgreSQL
- **Control de versiones:** GitHub
- **QA automatizado:** Lindy AI
