import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
// Funciones que van a ejecutar las rutas
export const register = async (req, res) => {
  //Extrae datos del request
  const { email, password, username } = req.body;
  try {
    //Ejecuta bcrypt y su metodo hash para encriptar la contrasena
    // El 10 indica las veces que se ejecutara el algoritmo
    const passwordHash = await bcrypt.hash(password, 10);
    // Crea una instancia del modelo User con los datos del body
    // La contrasena ya viene hasheada, no en texto
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    // Guarda el usuario y devuelve el documento creado
    const userSaved = await newUser.save();
    // Genera un JWT con el id del usuario recien creado
    const token = await createAccessToken({ id: userSaved._id });

    //Guarda el token en una cookie del navegador
    //El navegador la enviara automaticamente en cada request
    res.cookie("token", token);

    //Devuelve los datos del user
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

export const login = async (req, res) => {
  // Extrae datos del request
  const { email, password } = req.body;
  try {
    //Busca en mongo un user con ese mail
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });
    // Compara la contrasena que llego con el body con el hash guardado en la BD
    //Lo hace sin desencriptar con un metodo propio
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    //Crea un token de acceso
    const token = await createAccessToken({ id: userFound._id });
    //Guarda el token en la cookie y devuelve datos
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Hubo un error inesperado",
    });
  }
};

export const logout = (req, res) => {
  //Sobreescribe la cookie con un token vacio y fecha de expiracion en el pasado
  //El navegador la elimina
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  // req.user.id viene del middleware authRequired, lo extrajo del JWT
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
