import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
// Carga las variables del .env y las pone en process.env
dotenv.config();

// Crear una instancia aplicacion de express
const app = express();

// Metodo para que express entienda el JSON en el body de las requests (req.body)
app.use(express.json());
// Metodo para ver las llamadas al back
app.use(morgan("dev"));
// Todas las rutas empiezan con /api
app.use("/api", authRoutes);
// Conexion a MongoDB Atlas usando libreria mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando a MongoDB: ", err));

const PORT = process.env.PORT || 5000;

// Arranca el servidor en el puerto definido
// El callback se ejecuta cuando el servidor esta listo para recibir requests
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
