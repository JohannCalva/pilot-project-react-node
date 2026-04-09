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

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Registro</h2>

                {registerErrors.map((error, i) => (
                    <div className="alert alert-danger p-2 mb-3 small" key={i}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" {...register("username", {required: true})} />
                        {errors.username && <small className="text-danger">El username es requerido</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" {...register("email", {required: true})} />
                        {errors.email && <small className="text-danger">El email es requerido</small>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" {...register("password", {required: true})} />
                        {errors.password && <small className="text-danger">La contraseña es requerida</small>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Register
                    </button>
                </form>

                <p className="text-center mb-0">¿Ya tienes una cuenta? <Link to="/login" className="text-decoration-none">Login</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;