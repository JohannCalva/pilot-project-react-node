import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getUserRequest, updateUserRequest } from "../api/users.js";
import { useEffect } from "react";

function EditUserPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    // Extrae el id de la URL, ej: /users/edit/64f1a2b3c4d5e6f7a8b9c0d1
    const { id } = useParams();

    // Carga los datos del usuario al montar el componente
    // y los precarga en el formulario con setValue
    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await getUserRequest(id);
                // Rellena cada campo del formulario con los datos actuales del usuario
                setValue("username", res.data.username);
                setValue("email", res.data.email);
                setValue("role", res.data.role);
            } catch (error) {
                console.error("Error al cargar usuario", error);
            }
        };
        loadUser();
    }, [id]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateUserRequest(id, data);
            // Redirige a la lista tras actualizar exitosamente
            navigate("/users");
        } catch (error) {
            console.error("Error al actualizar usuario", error);
        }
    });

    return (
        <div>
            <h1>Editar Usuario</h1>
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
                {/* Password no es requerido al editar — el usuario puede dejarlo vacío
            si no quiere cambiarlo. El backend solo lo actualiza si viene en el body */}
                <input
                    type="password"
                    placeholder="Dejar vacío para no cambiar"
                    {...register("password")}
                />

                <label>Role:</label>
                <select {...register("role")}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => navigate("/users")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default EditUserPage;