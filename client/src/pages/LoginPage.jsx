import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signin, isAuthenticated, errors: signinErrors} = useAuth();
    const navigate = useNavigate();
        useEffect(() => {
            if (isAuthenticated) navigate('/users');
        }, [isAuthenticated, navigate]);
    
    const onSubmit = handleSubmit((data) =>{
        signin(data);
    })
    return(
        <div>
            <div>
                {signinErrors.map((error, i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))}
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <label>Email:</label>
                    {errors.email && <span>Email es requerido</span>}
                    <input type="email" {...register("email", {required: true})} />
                    <label>Password:</label>
                    {errors.password && <span>Contrasena es requerido</span>}
                    <input type="password" {...register("password", {required: true})} />
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default LoginPage;