import { createContext, useContext } from "react";
//Para guardar los datos de autenticacion del usuario
//Crea el contexto, el contenedor del estado global de la autenticacion
export const AuthContext = createContext();
// Hook personalizado para consumir el contexto desde cualquier componente
// En lugar de importar AuthContext y useContext en cada componente, solo importas useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
