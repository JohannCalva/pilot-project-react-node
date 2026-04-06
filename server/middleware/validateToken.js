import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, autorizacion denegada" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
  });
  next();
};
