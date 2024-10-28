ALTER TABLE preguntatrivia
DROP COLUMN tipo_pregunta;

ALTER TABLE preguntatrivia
ADD COLUMN opcion_1 TEXT NOT NULL,
ADD COLUMN opcion_2 TEXT NOT NULL,
ADD COLUMN opcion_3 TEXT NOT NULL,
ADD COLUMN respuesta_correcta INT CHECK (respuesta_correcta IN (1, 2, 3)) NOT NULL;

