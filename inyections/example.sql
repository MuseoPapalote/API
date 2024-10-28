-- Insertar dos zonas
INSERT INTO Zona (nombre_zona, descripcion)
VALUES
    ('Zona de Arte Contemporáneo', 'Una colección de arte moderno.'),
    ('Zona de Historia Antigua', 'Exhibiciones sobre antiguas civilizaciones.');
-- Insertar tres exposiciones para la Zona de Arte Contemporáneo (id_zona = 1)
INSERT INTO Exposicion (id_zona, nombre_exposicion, descripcion, codigo_qr)
VALUES
    (1, 'Pintura Abstracta', 'Una pieza emblemática del arte abstracto.', 'https://museo.com/qr/arte_abstracto'),
    (1, 'Escultura Moderna', 'Una obra de escultura moderna vanguardista.', 'https://museo.com/qr/escultura_moderna'),
    (1, 'Fotografía Conceptual', 'Una colección de fotografía conceptual.', 'https://museo.com/qr/fotografia_conceptual');

-- Insertar tres exposiciones para la Zona de Historia Antigua (id_zona = 2)
INSERT INTO Exposicion (id_zona, nombre_exposicion, descripcion, codigo_qr)
VALUES
    (2, 'Artefactos Egipcios', 'Exhibición de artefactos de la antigua civilización egipcia.', 'https://museo.com/qr/artefactos_egipcios'),
    (2, 'Escultura Romana', 'Escultura original de la Roma antigua.', 'https://museo.com/qr/escultura_romana'),
    (2, 'Mosaicos Griegos', 'Mosaicos originales de la Grecia antigua.', 'https://museo.com/qr/mosaicos_griegos');
