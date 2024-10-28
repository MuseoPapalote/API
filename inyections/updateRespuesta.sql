ALTER TABLE respuestatrivia
DROP COLUMN respuesta;

ALTER TABLE respuestatrivia
ADD COLUMN opcion_seleccionada INT CHECK(opcion_seleccionada IN (1,2,3)) NOT NULL;
ALTER TABLE respuestatrivia
ADD COLUMN es_correcta BOOLEAN NOT NULL;