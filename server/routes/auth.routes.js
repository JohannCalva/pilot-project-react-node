import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js";

const router = Router();
// Se definen las rutas y la funcion que ejecutaran
router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
