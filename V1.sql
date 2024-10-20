-- Crear la tabla Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),                -- Solo se usa si el usuario se registra de forma local
    google_id VARCHAR(100) UNIQUE,        -- ID de Google (si usa Google)
    facebook_id VARCHAR(100) UNIQUE,      -- ID de Facebook (si usa Facebook)
    rol VARCHAR(50) DEFAULT 'usuario',    -- 'usuario' o 'admin'
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla Zona
CREATE TABLE Zona (
    id_zona SERIAL PRIMARY KEY,
    nombre_zona VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Crear la tabla Exposición
CREATE TABLE Exposicion (
    id_exposicion SERIAL PRIMARY KEY,
    id_zona INT REFERENCES Zona(id_zona),
    nombre_exposicion VARCHAR(100) NOT NULL,
    descripcion TEXT,
    codigo_qr VARCHAR(255) NOT NULL,      -- Contenido del QR (como un ID único o URL)
    activo BOOLEAN DEFAULT TRUE,          -- Si la exposición está activa o no
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear el trigger para actualizar automáticamente la columna fecha_modificacion en Exposicion
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
   NEW.fecha_modificacion = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Asociar el trigger con la tabla Exposición para que se ejecute en cada UPDATE
CREATE TRIGGER actualizar_fecha_modificacion_trigger
BEFORE UPDATE ON Exposicion
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

-- Crear la tabla Visita    
CREATE TABLE Visita (
    id_visita SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    id_exposicion INT REFERENCES Exposicion(id_exposicion),
    fecha_hora_visita TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla Encuesta de Satisfacción
CREATE TABLE EncuestaSatisfaccion (
    id_encuesta SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    calificacion_general INT CHECK (calificacion_general >= 1 AND calificacion_general <= 5),  -- Ej. de 1 a 5
    comentarios TEXT,
    fecha_encuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla PreguntaTrivia
CREATE TABLE PreguntaTrivia (
    id_pregunta SERIAL PRIMARY KEY,
    texto_pregunta TEXT NOT NULL,
    tipo_pregunta VARCHAR(50) DEFAULT 'opcion_multiple'  -- 'opcion_multiple' o 'texto'
);

-- Crear la tabla RespuestaTrivia
CREATE TABLE RespuestaTrivia (
    id_respuesta SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    id_pregunta INT REFERENCES PreguntaTrivia(id_pregunta),
    respuesta TEXT,
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla ProgresoZona
CREATE TABLE ProgresoZona (
    id_progreso SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    id_zona INT REFERENCES Zona(id_zona),
    exposiciones_visitadas INT,
    total_exposiciones INT,                         -- Total de exposiciones en la zona
    porcentaje_avance FLOAT,                        -- Porcentaje de avance calculado (0.0 - 100.0)
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
