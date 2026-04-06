import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
// Funciones que van a ejecutar las rutas
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    //Ejecuta bcrypt y su metodo hash para encriptar la contrasena
    // El 10 indica las veces que se ejecutara el algoritmo
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Hubo un error inesperado",
    });
  }
};

export const login = (req, res) => res.send("login");
