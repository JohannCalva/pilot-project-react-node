import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  //Browser Router habilita el sistema de rutas en toda la app
  //Auth Provider envuelve todo para que el estado de auth este disponible en cualquier pagina
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*Rutas publicas y accesibles sin token*/}
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          {/* Rutas protegidas - ProtectedRoute verifica si hay sesion antes de renderizar */}
          <Route element={<ProtectedRoute />}>
            <Route path='/users' element={<h1>Users</h1>} />
            <Route path='/create-user' element={<h1>Create User</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>
       </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;