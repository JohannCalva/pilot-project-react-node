import { useState } from "react";
import { loginRequest, registerRequest } from '../api/auth';

//Provider — envuelve la app y hace que el estado esté disponible en todos los componentes
export const AuthProvider = ({children}) => {
    //Usuario que sera leido en la aplicacion
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (userData) => {
        try{
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            // Si el backend devuelve errores los guarda en el estado para mostrarlos en el form
            setErrors(error.response.data);
        }
    }
    const signin = async(userData) => {
        try{
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            setErrors(error.response.data);
        }
    }
    return (
        <AuthContext.Provider value={{signup, signin, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    );
};