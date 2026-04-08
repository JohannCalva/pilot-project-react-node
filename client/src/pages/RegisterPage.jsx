import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage(){
    const { register, handleSubmit, formState: {errors}, } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/profile');
    }, [isAuthenticated, navigate]);
    // Funcion para manejar el submit
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    }); 

    return(
        <div>
            {
                registerErrors.map((error) => (
                    <div className='bg-red-500, text-white'>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input type="text" {...register("username", {required: true})} />
                <label>Email:</label>
                {errors.email && <span>Email es requerido</span>}
                <input type="email" {...register("email", {required: true})} />
                <label>Password:</label>
                <input type="password" {...register("password", {required: true})} />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;