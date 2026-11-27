# Node.js + MySQL API

Template básico para aprender a desarrollar una API REST utilizando **Node.js, Express y MySQL**, ejecutando ambos servicios mediante Docker.

Este proyecto está diseñado como material de práctica. No utiliza ORM (como Prisma o Sequelize), por lo que las consultas a la base de datos se realizan directamente mediante SQL.

## 1. Tecnologías utilizadas

- **Node.js 22:** entorno de ejecución de JavaScript.
- **Express:** framework para desarrollar la API REST.
- **MySQL 8.4:** sistema gestor de bases de datos.
- **mysql2:** librería para conectar Node.js con MySQL.
- **Docker:** permite ejecutar la API y la base de datos en contenedores independientes.
- **Docker Compose:** permite administrar ambos contenedores desde un solo archivo.

## 2. Requisitos previos

Antes de comenzar, es necesario instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Una vez instalado:

1. Abrir Docker Desktop.
2. Esperar a que el servicio termine de iniciar.
3. Abrir una terminal.
4. Ejecutar:

```bash
docker --version
```

Después comprobar Docker Compose:

```bash
docker compose version
```

Si ambos comandos muestran una versión, el entorno está listo.

**Importante:** no es necesario instalar Node.js ni MySQL directamente en la computadora. Ambos se ejecutarán dentro de Docker.

## 3. Descargar el proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar al directorio:

```bash
cd node-mysql-template
```

Si descargaste el proyecto como archivo ZIP, descomprimirlo y abrir una terminal dentro de la carpeta.

## 4. Estructura del proyecto

```text
node-mysql-template/
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── .gitignore
├── .dockerignore
│
├── database/
│   └── init.sql
│
└── api/
    ├── package.json
    └── server.js
```

Descripción de los archivos principales:

| Archivo | Descripción |
|---|---|
| `docker-compose.yml` | Configuración de los contenedores. |
| `Dockerfile` | Configuración del contenedor de Node.js. |
| `.env.example` | Plantilla de variables de entorno. |
| `.env` | Credenciales locales del proyecto. |
| `database/init.sql` | Script inicial para crear las tablas. |
| `api/package.json` | Dependencias de Node.js. |
| `api/server.js` | Código principal de la API. |

## 5. Configurar las variables de entorno

En la raíz del proyecto encontrarás el archivo `.env.example`.

Su contenido es:

```dotenv
MYSQL_ROOT_PASSWORD=root123
MYSQL_DATABASE=escuela
MYSQL_USER=alumnos
MYSQL_PASSWORD=alumnos123
```

Para utilizarlo, debes crear una copia llamada `.env`.

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Estas variables configuran:

- La contraseña del usuario administrador de MySQL.
- El nombre de la base de datos.
- El usuario que utilizará la API.
- La contraseña de dicho usuario.

Para esta práctica se utilizarán las credenciales proporcionadas.

## 6. Levantar el proyecto

Desde la terminal, ubicarse en la carpeta principal del proyecto y ejecutar:

```bash
docker compose up -d --build
```

Este comando realizará las siguientes acciones:

1. Descargar la imagen de MySQL si no está disponible.
2. Construir la imagen de Node.js.
3. Crear el contenedor de MySQL.
4. Crear el contenedor de la API.
5. Configurar la comunicación entre ambos contenedores.
6. Ejecutar la API.

La primera ejecución puede tardar algunos minutos.

### Comprobar que los contenedores están funcionando

Ejecutar:

```bash
docker compose ps
```

Deberán aparecer los servicios `api` y `db` en ejecución. El servicio de base de datos deberá mostrar su estado saludable (`healthy`).

### Consultar los registros de la API

```bash
docker compose logs -f api
```

Si todo funciona correctamente, aparecerá un mensaje similar a:

```text
API ejecutandose en puerto 3000
```

Para salir de los registros, presionar `CTRL + C`. Esto no detiene los contenedores.

## 7. Probar la API

Una vez levantado el proyecto, la API estará disponible en:

```text
http://localhost:3000
```

Se puede utilizar Postman para realizar las peticiones HTTP.

### Endpoint principal

**GET** `/`

Comprueba que la API está funcionando.

```text
http://localhost:3000/
```

Respuesta esperada:

```json
{
  "mensaje": "API funcionando correctamente"
}
```

### Obtener todos los alumnos

**GET** `/api/alumnos`

```text
http://localhost:3000/api/alumnos
```

Devuelve todos los alumnos registrados en la base de datos.

### Obtener un alumno por ID

**GET** `/api/alumnos/:id`

Ejemplo:

```text
http://localhost:3000/api/alumnos/1
```

Devuelve el alumno cuyo identificador corresponde al proporcionado.

### Obtener un alumno por correo

**GET** `/api/alumnos/correo/:correo`

Ejemplo:

```text
http://localhost:3000/api/alumnos/correo/juan@correo.com
```

Devuelve el alumno que tenga registrado ese correo electrónico.

### Registrar un alumno

**POST** `/api/alumnos`

```text
http://localhost:3000/api/alumnos
```

En Postman seleccionar:

- Método: POST.
- Body.
- raw.
- JSON.

Enviar el siguiente objeto:

```json
{
  "nombre": "Pedro Garcia",
  "correo": "pedro@correo.com",
  "carrera": "Tecnologias Computacionales"
}
```

Si el registro es exitoso, la API responderá:

```json
{
  "mensaje": "Alumno registrado correctamente",
  "id": 3
}
```

## 8. Resumen de endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Comprobar API. |
| GET | `/api/alumnos` | Obtener todos los alumnos. |
| GET | `/api/alumnos/:id` | Buscar alumno por ID. |
| GET | `/api/alumnos/correo/:correo` | Buscar alumno por correo. |
| POST | `/api/alumnos` | Registrar un alumno. |

## 9. Conectarse a MySQL desde MySQL Workbench

También es posible conectarse directamente a la base de datos utilizando MySQL Workbench.

Crear una nueva conexión con los siguientes datos:

| Parámetro | Valor |
|---|---|
| Hostname | `localhost` |
| Port | `3307` |
| Username | `alumnos` |
| Password | `alumnos123` |
| Database | `escuela` |

Una vez conectados, pueden ejecutar consultas SQL:

```sql
USE escuela;

SELECT * FROM alumnos;
```

**Importante:** el puerto 3307 es el puerto de acceso desde la computadora. Internamente, la API se conecta a MySQL mediante el puerto 3306.

## 10. Comandos útiles de Docker

### Iniciar los contenedores

```bash
docker compose up -d
```

### Detener los contenedores

```bash
docker compose down
```

### Reconstruir la API

Si se modifica el Dockerfile o las dependencias:

```bash
docker compose up -d --build
```

### Consultar los contenedores activos

```bash
docker compose ps
```

### Consultar los registros de la API

```bash
docker compose logs -f api
```

### Consultar los registros de MySQL

```bash
docker compose logs -f db
```

### Reiniciar los contenedores

```bash
docker compose restart
```

## 11. Solución de problemas comunes

### Error: Cannot connect to the Docker daemon

**Causa:** Docker Desktop no está iniciado.

**Solución:** abrir Docker Desktop y esperar a que termine de iniciar.

### Error: Port is already allocated

**Causa:** otro servicio está utilizando alguno de los puertos 3000 o 3307.

**Solución:** modificar el puerto del lado izquierdo en `docker-compose.yml`.

Por ejemplo:

```yaml
ports:
  - "3001:3000"
```

En este caso, la API estará disponible en `http://localhost:3001`.

### Error: Access denied for user

**Causa:** las credenciales de MySQL no coinciden con las configuradas en el volumen existente.

**Solución:** revisar el archivo `.env` y verificar las credenciales.

### Error: Table doesn't exist

**Causa:** la tabla no fue creada o el script inicial no se ejecutó.

**Solución:** verificar el archivo `database/init.sql` y consultar los registros de MySQL.

Recuerda que el script de inicialización solamente se ejecuta automáticamente cuando se crea un volumen de base de datos nuevo.

## 12. Reiniciar la base de datos desde cero

Si necesitas eliminar todos los registros y volver a crear la base de datos desde cero, ejecutar:

```bash
docker compose down -v
```

Después:

```bash
docker compose up -d --build
```

**ADVERTENCIA:** este procedimiento elimina el volumen de MySQL y, por lo tanto, todos los datos almacenados. No utilizarlo si deseas conservar tus prácticas anteriores.

## 13. Actividades sugeridas

Una vez que el proyecto esté funcionando, puedes utilizarlo para realizar las siguientes actividades:

1. Crear una nueva tabla en MySQL.
2. Agregar registros a la nueva tabla.
3. Crear un endpoint GET para consultar sus registros.
4. Crear un endpoint POST para insertar nuevos registros.
5. Crear un endpoint PUT para actualizar registros.
6. Crear un endpoint DELETE para eliminar registros.
7. Consumir los nuevos endpoints desde una aplicación móvil.

---

**¡Listo!**

Con este proyecto ya tienes un entorno de desarrollo funcional con Node.js, Express y MySQL, sin necesidad de instalar dependencias directamente en tu computadora.
