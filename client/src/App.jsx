import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UsersPage from "./pages/UsersPage.jsx";
import CreateUserPage from "./pages/CreateUserPage.jsx";
import EditUserPage from "./pages/EditUserPage.jsx";

function App() {
  //Browser Router habilita el sistema de rutas en toda la app
  //Auth Provider envuelve todo para que el estado de auth este disponible en cualquier pagina
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*Rutas publicas y accesibles sin token*/}
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          {/* Rutas protegidas - ProtectedRoute verifica si hay sesion antes de renderizar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/create" element={<CreateUserPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />
          </Route>
       </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;