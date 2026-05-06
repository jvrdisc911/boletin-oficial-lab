# Equipo Contenido - Boletín Oficial Lab

Responsable de la carga, mantenimiento y actualización de normativas, avisos y publicaciones oficiales.

## Estructura

```
contenido/
├── datos/
│   └── normativas.sql       # Datos de ejemplo para todas las secciones
└── scripts/
  └── cargar-contenido.js  # Script de carga automática a PostgreSQL
```

## Cómo cargar contenido

### 1. Configurar variables de entorno
```bash
cd backend
cp .env.example .env
# Editar .env con los datos de tu PostgreSQL
```

### 2. Crear la base de datos
```bash
psql -U postgres -c "CREATE DATABASE boletin_oficial;"
psql -U postgres -d boletin_oficial -f backend/database/schema.sql
```

### 3. Cargar los datos de ejemplo
```bash
cd contenido
node scripts/cargar-contenido.js
```

## Contenido incluido

### Primera Sección - Legislación
| Tipo | Ejemplo |
|------|---------|
| Ley | Ley 27.742 - Bases y Puntos de Partida |
| Decreto | Decreto 512/2026 - Contrataciones del Estado |
| Resolución | Resolución 1024/2026 - AFIP - Vencimientos |
| Disposición | Disposición 88/2026 - ANMAT |

### Segunda Sección - Sociedades
| Tipo | Ejemplo |
|------|---------|
| SAS | TechLab Argentina S.A.S. |
| Edicto Judicial | Juzgado Civil N° 45 |
| Sucesión | MARTÍNEZ, Ana María |

### Tercera Sección - Contrataciones
| Tipo | Ejemplo |
|------|---------|
| Licitación Pública | Obra vial RN 7 - $2.500M |
| Adjudicación | Insumos hospitalarios - $180M |
| Contratación Directa | CONICET - Equipamiento |

### Cuarta Sección - Dominios
| Tipo | Ejemplo |
|------|---------|
| Registro | techlab.com.ar, boletinlab.gob.ar |
| Transferencia | servicios-digitales.com.ar |

## Cómo agregar nuevo contenido

Agregar un INSERT en `datos/normativas.sql` siguiendo el formato:

```sql
INSERT INTO avisos (edicion_id, seccion_id, categoria_id, titulo, contenido, organismo, numero_aviso, fecha_publicacion)
VALUES (
1,           -- edicion_id
1,           -- seccion_id (1=Primera, 2=Segunda, 3=Tercera, 4=Cuarta)
1,           -- categoria_id (ver tabla categorias)
'Título del aviso',
'Texto completo del aviso...',
'Organismo emisor',
'REF-2026-XXXX',
'2026-05-06'
);
```
