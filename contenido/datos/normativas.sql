-- ============================================
-- BOLETÍN OFICIAL - Laboratorio de Informática
-- Datos de ejemplo: Normativas y Avisos
-- Equipo Contenido
-- ============================================

-- Edición de ejemplo
INSERT INTO ediciones (fecha, numero_edicion) VALUES
 ('2026-05-06', 35421),
 ('2026-05-05', 35420),
 ('2026-05-04', 35419);

-- ---- PRIMERA SECCIÓN: Legislación ----

INSERT INTO avisos (edicion_id, seccion_id, categoria_id, titulo, contenido, organismo, numero_aviso, fecha_publicacion) VALUES

(1, 1, 1,
'Ley 27.742 - Bases y Puntos de Partida para la Libertad de los Argentinos',
'El Senado y Cámara de Diputados de la Nación Argentina reunidos en Congreso, sancionan con fuerza de Ley: TÍTULO I - EMERGENCIA PÚBLICA. Artículo 1°: Declárase la emergencia pública en materia económica, financiera, fiscal, administrativa, previsional, tarifaria, sanitaria y social.',
'Honorable Congreso de la Nación',
'LEY-2026-27742',
'2026-05-06'),

(1, 1, 2,
'Decreto 512/2026 - Reglamentación del Sistema de Contrataciones del Estado',
'VISTO el Expediente N° EX-2026-00512-APN-SLYT#JGM, la Ley N° 13.064 de Obras Públicas, y CONSIDERANDO: Que resulta necesario actualizar el régimen de contrataciones del Estado Nacional para adecuarlo a las nuevas tecnologías disponibles.',
'Jefatura de Gabinete de Ministros',
'DEC-2026-512',
'2026-05-06'),

(1, 1, 3,
'Resolución 1024/2026 - AFIP - Prórroga vencimientos impositivos',
'Buenos Aires, 5 de mayo de 2026. VISTO la Actuación N° RE-2026-01024-E-AFIP-AFIP del Registro de la ADMINISTRACIÓN FEDERAL DE INGRESOS PÚBLICOS, y CONSIDERANDO: Que resulta conveniente prorrogar los vencimientos para la presentación de declaraciones juradas.',
'Administración Federal de Ingresos Públicos',
'RES-2026-1024-AFIP',
'2026-05-06'),

(1, 1, 4,
'Disposición 88/2026 - ANMAT - Habilitación de medicamentos',
'Ciudad Autónoma de Buenos Aires, 6 de mayo de 2026. VISTO el Expediente N° EX-2026-00088-ANMAT, y CONSIDERANDO que los productos médicos presentados cumplen con los requisitos establecidos por la normativa vigente.',
'Administración Nacional de Medicamentos, Alimentos y Tecnología Médica',
'DISP-2026-88-ANMAT',
'2026-05-06');

-- ---- SEGUNDA SECCIÓN: Sociedades ----

INSERT INTO avisos (edicion_id, seccion_id, categoria_id, titulo, contenido, organismo, numero_aviso, fecha_publicacion) VALUES

(1, 2, 6,
'Constitución SAS - TechLab Argentina S.A.S.',
'Por instrumento privado de fecha 2 de mayo de 2026 se constituyó la Sociedad por Acciones Simplificada denominada TECHLAB ARGENTINA S.A.S. Domicilio: Av. Corrientes 1234, CABA. Objeto: Desarrollo de software y servicios tecnológicos. Capital: $500.000.',
'Inspección General de Justicia',
'SAS-2026-00341',
'2026-05-06'),

(1, 2, 8,
'Edicto Judicial - Juzgado Civil N° 45 - Citación de herederos',
'El Juzgado Nacional de Primera Instancia en lo Civil N° 45, Secretaría N° 89, cita y emplaza por el término de treinta días a herederos y acreedores de GARCÍA, Roberto Ángel, DNI 12.345.678, fallecido el 15 de abril de 2026.',
'Poder Judicial de la Nación',
'EDIC-2026-00892',
'2026-05-06'),

(1, 2, 9,
'Sucesión - MARTÍNEZ, Ana María',
'El Juzgado Nacional de Primera Instancia en lo Civil N° 12 hace saber que por ante este Tribunal tramita el proceso sucesorio de MARTÍNEZ, Ana María, DNI 20.456.789. Se cita a herederos y acreedores a presentarse dentro de los 30 días hábiles.',
'Poder Judicial de la Nación',
'SUC-2026-00234',
'2026-05-05');

-- ---- TERCERA SECCIÓN: Contrataciones ----

INSERT INTO avisos (edicion_id, seccion_id, categoria_id, titulo, contenido, organismo, numero_aviso, fecha_publicacion) VALUES

(1, 3, 11,
'Licitación Pública N° 12/2026 - Ministerio de Infraestructura - Obra vial RN 7',
'El Ministerio de Infraestructura llama a Licitación Pública Nacional para la contratación de la obra: REPAVIMENTACIÓN RUTA NACIONAL N° 7, TRAMO: KM 150 - KM 200, Provincia de Mendoza. Presupuesto oficial: $2.500.000.000. Apertura de ofertas: 20 de mayo de 2026 a las 10:00 hs.',
'Ministerio de Infraestructura',
'LP-2026-0012',
'2026-05-06'),

(1, 3, 14,
'Adjudicación Licitación N° 08/2026 - Ministerio de Salud - Insumos hospitalarios',
'El Ministerio de Salud de la Nación resuelve adjudicar la Licitación Pública N° 08/2026 a la firma MEDISUPPLY S.A. por la provisión de insumos hospitalarios por un monto total de $180.000.000. Plazo de entrega: 60 días corridos.',
'Ministerio de Salud',
'ADJ-2026-0008',
'2026-05-05'),

(1, 3, 13,
'Contratación Directa N° 55/2026 - CONICET - Equipamiento científico',
'El Consejo Nacional de Investigaciones Científicas y Técnicas convoca a Contratación Directa para la adquisición de equipamiento de laboratorio. Monto estimado: $4.500.000. Presentación de ofertas hasta el 12 de mayo de 2026.',
'CONICET',
'CD-2026-0055',
'2026-05-06');

-- ---- CUARTA SECCIÓN: Dominios ----

INSERT INTO avisos (edicion_id, seccion_id, categoria_id, titulo, contenido, organismo, numero_aviso, fecha_publicacion) VALUES

(1, 4, 16,
'Registro de dominios .ar - Mayo 2026',
'NIC Argentina informa el registro de los siguientes dominios bajo el código de país .ar: techlab.com.ar, boletinlab.gob.ar, informatica2026.edu.ar, consultora-norte.com.ar, estudio-juridico-perez.com.ar.',
'NIC Argentina',
'DOM-REG-2026-0501',
'2026-05-06'),

(1, 4, 17,
'Transferencia de dominios .ar - Mayo 2026',
'NIC Argentina informa la transferencia de titularidad de los siguientes dominios: servicios-digitales.com.ar (de EMPRESA A S.A. a EMPRESA B S.R.L.), plataforma-educativa.org.ar (de FUNDACIÓN X a FUNDACIÓN Y).',
'NIC Argentina',
'DOM-TRANS-2026-0501',
'2026-05-05');