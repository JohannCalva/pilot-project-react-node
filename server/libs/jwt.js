import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
// Envuelve jwt.sign en una Promise para poder usarla con async/await
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // datos que se guardan dentro del token (ej: { id })
      process.env.JWT_SECRET, // clave secreta para firmar — nunca debe ser pública
      { expiresIn: "1d" }, // el token expira en 1 día, después hay que volver a hacer login
      (err, token) => {
        if (err) reject(err); // si algo falla, la Promise se rechaza
        resolve(token); // si todo bien, devuelve el token generado
      },
    );
  });
}
