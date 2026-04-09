import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context.js';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){
    const { register, handleSubmit, formState: {errors}, } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/users');
    }, [isAuthenticated, navigate]);
    // Funcion para manejar el submit
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    }); 

    return(
        <div>
            {
                registerErrors.map((error, i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                {errors.username && <span>El username es requerido</span>}
                <input type="text" {...register("username", {required: true})} />
                <label>Email:</label>
                {errors.email && <span>Email es requerido</span>}
                <input type="email" {...register("email", {required: true})} />
                <label>Password:</label>
                {errors.password && <span>Contrasena es requerido</span>}
                <input type="password" {...register("password", {required: true})} />
                <button type="submit">
                    Register
                </button>
            </form>
            <p>Already have an account? {" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    )
}

export default RegisterPage;