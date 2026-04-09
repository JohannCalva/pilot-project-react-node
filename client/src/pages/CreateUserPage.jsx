import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserRequest } from "../api/users.js";

function CreateUserPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createUserRequest(data);
            // Redirige a la lista de usuarios tras crear exitosamente
            navigate("/users");
        } catch (error) {
            console.error("Error al crear usuario", error);
        }
    });

    return (
        <div>
            <h1>Crear Usuario</h1>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                {errors.username && <span>El username es requerido</span>}
                <input
                    type="text"
                    {...register("username", { required: true })}
                />

                <label>Email:</label>
                {errors.email && <span>El email es requerido</span>}
                <input
                    type="email"
                    {...register("email", { required: true })}
                />

                <label>Password:</label>
                {errors.password && <span>La contraseña es requerida</span>}
                <input
                    type="password"
                    {...register("password", { required: true })}
                />

                <label>Role:</label>
                {/* Select para limitar los valores al enum definido en el modelo */}
                <select {...register("role")}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Crear</button>
                <button type="button" onClick={() => navigate("/users")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default CreateUserPage;