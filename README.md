# IS-2026 Checkpoint 01 - TeamBoard App

## Integrantes y Roles

| Nombre            | Legajo | Feature         | Servicio              |
| ----------------- | ------ | --------------- | --------------------- |
| Felipe Andreau    | 33294  | Feature 01 y 03 | Coordinador / Backend |
| Pedro Fiuza       | 33142  | Feature 02      | Frontend              |
| Jesús Vergara     | 33319  | Feature 04      | Database              |
| Máximo Carpignano | 32971  | Feature 05      | Portainer             |

## Cómo ejecutar el proyecto

1. Clonar el repositorio.
2. Crear el archivo `.env` basado en `.env.example`.
3. Ejecutar:
   ```bash
   docker compose up -d --build
   ```

## Servicios

### Frontend

- **Tecnologías:** HTML5, JavaScript Vanilla, CSS
- **Puerto:** `8080`
- **Descripción:** Interfaz web estática que consume la API REST del backend para mostrar en tiempo real los miembros del equipo. No requiere frameworks adicionales, corre directamente en el navegador y se comunica con el backend mediante fetch a los endpoints `/api/team` e `/api/info`.
- **Recursos:** CPU 0.5 | RAM 128MB

---

### Backend

- **Tecnologías:** Python, Flask 3.0.2, psycopg2-binary, flask-cors
- **Puerto:** `5000`
- **Descripción:** API REST desarrollada en Flask que actúa como capa de negocio entre el frontend y la base de datos. Expone endpoints para verificar el estado del servicio, obtener información del equipo y consultar datos de la aplicación. Tiene CORS habilitado para permitir las solicitudes desde el frontend.
- **Recursos:** CPU 0.5 | RAM 128MB

---

### Database

- **Tecnologías:** PostgreSQL 16 Alpine
- **Puerto:** `5432` (interno)
- **Descripción:** Base de datos relacional que almacena de forma persistente la información de los miembros del equipo. Utiliza un volumen Docker para garantizar que los datos no se pierdan al reiniciar los contenedores. Solo es accesible desde la red interna, no está expuesta al exterior.
- **Recursos:** CPU 0.5 | RAM 256MB

---

### Portainer

- **Tecnologías:** Portainer CE
- **Puerto:** `9000`
- **Descripción:** Herramienta de monitoreo y administración visual de contenedores Docker. Permite ver en tiempo real el estado de cada servicio, revisar logs, consumo de recursos (CPU y RAM) y gestionar los contenedores sin necesidad de usar la terminal. Accesible desde el navegador en `http://localhost:9000`.
- **Recursos:** CPU 0.5 | RAM 128MB

## Monitoreo con Portainer

Portainer es una interfaz web para administrar y monitorear contenedores Docker visualmente.

### Requisitos previos

- Tener Docker Desktop corriendo
- Tener el archivo `.env` configurado en la raíz del proyecto (basarse en `.env.example`)

### Como acceder al panel

1. Levantar todos los servicios desde la raíz del proyecto:

```bash
   docker compose up -d
```

2. Abrir el navegador y entrar a:
   http://localhost:9000

3. En el primer acceso, crear un usuario administrador con contraseña.
   ![Crear usuario admin](portainer/img/portainer-login.png)

4. Seleccionar el entorno **local** para ver los contenedores.

### Panel de monitoreo

#### Dashboard - Resumen del entorno

![Dashboard](portainer/img/portainer-dashboard.png)

#### Stack con los contenedores corriendo

![Stack](portainer/img/portainer-stack.png)

### Servicios disponibles

| Servicio    | URL                              |
| ----------- | -------------------------------- |
| Frontend    | http://localhost:8080            |
| Backend API | http://localhost:5000/api/team   |
| Backend API | http://localhost:5000/api/health |
| Portainer   | http://localhost:9000            |

#### Frontend - TeamBoard

![Frontend](portainer/img/portainer-frontend.png)

#### Backend - API REST

![API](portainer/img/portainer-api.png)
