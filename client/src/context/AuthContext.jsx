import { useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from '../api/auth';
import { AuthContext } from "./auth-context";
import Cookies from "js-cookie";
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
            const errorData = error.response?.data;
            setErrors(Array.isArray(errorData) ? errorData : [errorData || 'An error occurred']);
        }
    }
    const signin = async(userData) => {
        try{
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            const errorData = error.response?.data;
            setErrors(Array.isArray(errorData) ? errorData : [errorData || 'An error occurred']);
        }
    }

    const logout = async () => {
        try {
            await logoutRequest();
            Cookies.remove("token");
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (cookies.token) {
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if (!res.data) setIsAuthenticated(false);
                    setIsAuthenticated(true);
                    setUser(res.data);
                } catch (error) {
                    console.log(error);
                    setIsAuthenticated(false);
                    setUser(null);
                }
                
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{signup, signin, logout, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    );
};