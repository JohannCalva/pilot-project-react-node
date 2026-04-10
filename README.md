# <h1 align="center">Pilot Project React Node</h1>

## Índice
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Estado del Proyecto](#estado-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Acceso al Proyecto](#acceso-al-proyecto)
  - [Instrucciones para el Servidor (Backend)](#instrucciones-para-el-servidor-backend)
  - [Instrucciones para el Cliente (Frontend)](#instrucciones-para-el-cliente-frontend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Desarrollador](#desarrollador)

## Descripción del Proyecto
Esta es una aplicación fullstack que incluye un frontend desarrollado en React con Vite y un backend construido con Node.js y Express. Utiliza una base de datos de MongoDB Atlas mediante Mongoose y sigue un patrón de arquitectura MVC en el lado del servidor. El sistema cuenta con autenticación segura utilizando JSON Web Tokens (JWT) almacenados en cookies `httpOnly`, lo que permite manejar rutas protegidas.

## Estado del Proyecto
Piloto

## Funcionalidades
- **Sistema de autenticación:** Login seguro mediante JWT.
- **Rutas Protegidas:** Acceso restringido a áreas del sistema únicamente para usuarios autenticados.
- **Operaciones CRUD de Usuarios:**
  - **Crear:** Registro de nuevos usuarios.
  - **Leer:** Visualización de información y listado de usuarios.
  - **Actualizar:** Modificación de los datos de un usuario existente.
  - **Eliminar:** Borrado de usuarios del sistema.

## Acceso al Proyecto
Sigue estos pasos para clonar el repositorio y ejecutar el entorno de desarrollo localmente.

Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd pilot-project-react-node
```

### Instrucciones para el Servidor (Backend)
1. Navega al directorio del servidor:
   ```bash
   cd server
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz de `server/` e incluye las siguientes variables de entorno:
   ```env
   PORT=4000
   MONGO_URI=<TU_URI_DE_MONGODB_ATLAS>
   JWT_SECRET=<TU_SECRETO_PARA_JWT>
   ```
4. Inicia el servidor en modo de desarrollo:
   ```bash
   npm run dev
   ```

### Instrucciones para el Cliente (Frontend)
1. Desde la raíz del proyecto, navega al directorio del cliente:
   ```bash
   cd client
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

## Tecnologías Utilizadas
- **Frontend:** React, Vite, React Router, React Hook Form, Axios.
- **Backend:** Node.js, Express, bcryptjs, cookie-parser, JWT (JSON Web Tokens).
- **Base de Datos:** MongoDB Atlas, Mongoose.

## Estructura del Proyecto
El repositorio está dividido en dos carpetas principales: `client/` para el frontend y `server/` para el backend.

```text
pilot-project-react-node/
├── client/          # Frontend con React + Vite
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── server/          # Backend con Node.js + Express
    ├── src/
    │   ├── controllers/
    │   ├── db/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routes/
    │   ├── app.js
    │   └── index.js
    └── package.json
```