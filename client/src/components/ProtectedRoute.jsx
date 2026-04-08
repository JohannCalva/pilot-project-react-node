import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context.js";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Si no hay sesión activa, redirige al login
  // Replace reemplaza la ruta en el historial para que el usuario
  // no pueda volver atrás con el botón del navegador
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si hay sesión, renderiza el componente hijo que esté dentro de esta ruta
  // Outlet es un placeholder que React Router reemplaza con la página correspondiente
  // En App.jsx el Outlet sería UsersPage
  return <Outlet />;
}

export default ProtectedRoute;