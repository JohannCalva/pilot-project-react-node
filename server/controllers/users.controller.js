import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

//GET /api/users - devuelve todos los usuarios
export const getUsers = async (req, res) => {
  try {
    //excluimos la contrasena por seguridad
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

//GET /api/users/:id - devuelve usuario por id
export const getUserById = async (req, res) => {
  try {
    //req.params.id viene de la url
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

//POST /api/users - crea un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "El email ya está registrado" });

    //La contrasena se hashea antes de guardar
    const passwordHash = await bcrypt.hash(password, 10);
    //Instanciamos un nuevo usuario
    const newUser = new User({ username, email, password: passwordHash, role });
    // Guardamos el usuario
    const userSaved = await newUser.save();
    //Devuelve los datos del user
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const updateData = { username, email, role };

    //Solo hashea la contrasena si el usuario decidio cambiarla
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // new: true devuelve el documento ya actualizado, no el anterior
    // runValidators: true aplica las validaciones del esquema al actualizar
    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    ).select("-password");

    if (!userUpdated)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado", userUpdated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// DELETE /api/users/:id - elimina un usuario por id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al aliminar usuario" });
  }
};
