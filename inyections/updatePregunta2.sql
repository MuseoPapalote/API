ALTER TABLE preguntatrivia
ADD COLUMN id_exposicion INT REFERENCES exposicion(id_exposicion) ON DELETE CASCADE NOT NULL;
