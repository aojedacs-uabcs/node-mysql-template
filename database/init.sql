
CREATE TABLE IF NOT EXISTS alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL
);

INSERT INTO alumnos (nombre, correo, carrera)
VALUES
('Juan Perez', 'juan@correo.com', 'Software'),
('Maria Lopez', 'maria@correo.com', 'Computacion');
