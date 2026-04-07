import {useForm} from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage(){
    const { register, handleSubmit } = useForm();
    // Funcion para manejar el submit
    const onSubmit = handleSubmit(async (values) => {
        const res = await registerRequest(values)
        console.log(res);
    }); 

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input type="text" {...register("username", {required: true})} />
                <label>Email:</label>
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