import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth-context";

function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signin, errors: signinErrors} = useAuth();
    const onSubmit = handleSubmit((data) =>{
        signin(data);
    })
    return(
        <div>
            <div>
                {signinErrors.map((error, i) => (
                    <div className='bg-red-500, text-white' key={i}>
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