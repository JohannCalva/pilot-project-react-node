import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Carga las variables del .env y las pone en process.env
dotenv.config();

// Crear una instancia aplicacion de express
const app = express();
// Para permitir que los dominios se puedan comunicar con el servidor
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //Para que express agregue el header Access-Controll...
  }),
);
// Metodo para que express entienda el JSON en el body de las requests (req.body)
app.use(express.json());
// Tiene que estar antes de las rutas para poder procesar las cookies de los headers
app.use(cookieParser());
// Metodo para ver las llamadas al back
app.use(morgan("dev"));
// Todas las rutas empiezan con /api
app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);
// Conexion a MongoDB Atlas usando libreria mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando a MongoDB: ", err));

const PORT = process.env.PORT || 5000;

// Arranca el servidor en el puerto definido
// El callback se ejecuta cuando el servidor esta listo para recibir requests
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
