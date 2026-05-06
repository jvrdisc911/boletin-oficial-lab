-- ============================================
-- BOLETÍN OFICIAL - Laboratorio de Informática
-- Esquema de base de datos PostgreSQL
-- ============================================

-- Secciones del Boletín
CREATE TABLE secciones (
id SERIAL PRIMARY KEY,
numero INTEGER NOT NULL UNIQUE,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
activa BOOLEAN DEFAULT TRUE,
creado_en TIMESTAMP DEFAULT NOW()
);

-- Ediciones diarias
CREATE TABLE ediciones (
id SERIAL PRIMARY KEY,
fecha DATE NOT NULL UNIQUE,
numero_edicion INTEGER NOT NULL,
activa BOOLEAN DEFAULT TRUE,
creado_en TIMESTAMP DEFAULT NOW()
);

-- Categorías de avisos por sección
CREATE TABLE categorias (
id SERIAL PRIMARY KEY,
seccion_id INTEGER REFERENCES secciones(id),
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
activa BOOLEAN DEFAULT TRUE
);

-- Avisos oficiales
CREATE TABLE avisos (
id SERIAL PRIMARY KEY,
edicion_id INTEGER REFERENCES ediciones(id),
seccion_id INTEGER REFERENCES secciones(id),
categoria_id INTEGER REFERENCES categorias(id),
titulo VARCHAR(255) NOT NULL,
contenido TEXT NOT NULL,
organismo VARCHAR(255),
numero_aviso VARCHAR(50),
fecha_publicacion DATE NOT NULL,
activo BOOLEAN DEFAULT TRUE,
creado_en TIMESTAMP DEFAULT NOW(),
actualizado_en TIMESTAMP DEFAULT NOW()
);

-- Usuarios del sistema
CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
rol VARCHAR(50) DEFAULT 'lector',
activo BOOLEAN DEFAULT TRUE,
creado_en TIMESTAMP DEFAULT NOW()
);

-- Búsquedas registradas (para analytics)
CREATE TABLE busquedas (
id SERIAL PRIMARY KEY,
termino VARCHAR(255) NOT NULL,
usuario_id INTEGER REFERENCES usuarios(id),
resultados_count INTEGER DEFAULT 0,
fecha TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales: secciones
INSERT INTO secciones (numero, nombre, descripcion) VALUES
(1, 'Primera Sección', 'Legislación y Avisos Oficiales'),
(2, 'Segunda Sección', 'Sociedades y Avisos Judiciales'),
(3, 'Tercera Sección', 'Contrataciones'),
(4, 'Cuarta Sección', 'Dominios de Internet');

-- Datos iniciales: categorías
INSERT INTO categorias (seccion_id, nombre) VALUES
(1, 'Leyes'),
(1, 'Decretos'),
(1, 'Resoluciones'),
(1, 'Disposiciones'),
(2, 'Contratos sobre Personas Jurídicas'),
(2, 'Sociedades por Acción Simplificada'),
(2, 'Convocatorias y Avisos Comerciales'),
(2, 'Edictos Judiciales'),
(2, 'Sucesiones'),
(2, 'Sociedades Anónimas'),
(3, 'Licitaciones Públicas'),
(3, 'Licitaciones Privadas'),
(3, 'Contrataciones Directas'),
(3, 'Adjudicaciones'),
(3, 'Concursos de Precios'),
(4, 'Registro de Dominios'),
(4, 'Transferencia de Dominios'),
(4, 'Baja de Dominios');