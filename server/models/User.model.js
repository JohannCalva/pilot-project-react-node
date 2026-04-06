import mongoose from "mongoose";

// Define la estructura de un documento "usuario" en MongoDB
// Mongoose valida que los datos cumplan el esquema antes de guardarlos
// Tiene un new porque es una instancia de mongoose y para que salgan los metodos.
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }, // agrega automaticamente createdAt y updatedAt
);

//Convierte el esquema en un modelo llamado User
// Mongoose usara la coleccion "users" en MongoDB automaticamente
export default mongoose.model("User", userSchema);
