import User from "../models/User.model.js";
// Funciones que van a ejecutar las rutas
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Hubo un error inesperado",
    });
  }
};

export const login = (req, res) => res.send("login");
