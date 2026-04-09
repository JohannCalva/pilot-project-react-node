import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
// Importa el middleware que verifica el JWT antes de dar acceso a rutas protegidas
import { authRequired } from "../middleware/validateToken.js";

//Agrupa  rutas relacionada
const router = Router();
// Se definen las rutas y la funcion que ejecutaran
//Rutas publicas
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
//Ruta protegida, authRequired se ejecuta antes
//Si el token no es valido, authRequired corta la req y no ejecuta profile
router.get("/profile", authRequired, profile);

export default router;
