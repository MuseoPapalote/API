ALTER TABLE preguntatrivia ALTER COLUMN id_exposicion DROP NOT NULL;
ALTER TABLE preguntatrivia ADD COLUMN id_zona INT NOT NULL;
ALTER TABLE preguntatrivia ADD CONSTRAINT fk_preguntatrivia_zona FOREIGN KEY (id_zona) REFERENCES zona(id_zona);