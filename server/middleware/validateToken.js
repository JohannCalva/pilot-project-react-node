import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authRequired = (req, res, next) => {
  // Extrae el token de las cookies de la request
  // El navegador envía las cookies automáticamente en cada request
  const { token } = req.cookies;
  //Si no existe, se corta
  if (!token)
    return res.status(401).json({ message: "No token, autorizacion denegada" });

  //Verifica que el token sea valido y no haya expirado
  // Usa un callback, es asincrono
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //Si el token es invalido
    if (err) return res.status(403).json({ message: "Invalid token" });
    //Si es valido, adjunta los datos del usuario al request
    req.user = user;
    //Todo valido, pasa al controller
    next();
  });
};
