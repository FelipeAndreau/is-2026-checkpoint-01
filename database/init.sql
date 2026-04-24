CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    legajo VARCHAR(20) NOT NULL,
    feature VARCHAR(100) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- Limpieza para evitar duplicados en reinicios
TRUNCATE TABLE members;

-- Insertar los datos reales del grupo
INSERT INTO members (name, legajo, feature, servicio, status) VALUES
('Felipe Andreau', '33294', 'Feature 01 y 03', 'Coordinador / Backend', 'Active'),
('Pedro Fiuza', '33142', 'Feature 02', 'Frontend', 'Active'),
('Jesús Vergara', '33319', 'Feature 04', 'Base de datos', 'Active'),
('Máximo Carpignano', '32971', 'Feature 05', 'Portainer', 'Active');