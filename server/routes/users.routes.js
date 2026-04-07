import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
// Importa el middleware que verifica el JWT antes de dar acceso a rutas protegidas
import { authRequired } from "../middleware/validateToken.js";

//Agrupa  rutas relacionada
const router = Router();
// Se definen las rutas y la funcion que ejecutaran
//Rutas protegidas, sin token ninguna es accesible
router.get("/", authRequired, getUsers);
router.get("/:id", authRequired, getUserById);
router.post("/", authRequired, createUser);
router.put("/:id", authRequired, updateUser);
router.delete("/:id", authRequired, deleteUser);

export default router;
