import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth-context";
import { useNavigate, Link } from "react-router-dom";
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
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                
                {signinErrors.map((error, i) => (
                    <div className="alert alert-danger p-2 mb-3 small" key={i}>
                        {error}
                    </div>
                ))}
                
                <form onSubmit={onSubmit}>
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
                        Login
                    </button>
                </form>

                <p className="text-center mb-0">¿No tienes una cuenta? <Link to="/register" className="text-decoration-none">Regístrate</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;