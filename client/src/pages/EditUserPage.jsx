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
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-header bg-white pb-0 border-bottom-0 mt-3">
                    <h2 className="text-center">Editar Usuario</h2>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("username", { required: true })}
                            />
                            {errors.username && <small className="text-danger mt-1">El username es requerido</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <small className="text-danger mt-1">El email es requerido</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            {/* Password no es requerido al editar — el usuario puede dejarlo vacío si no quiere cambiarlo. El backend solo lo actualiza si viene en el body */}
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Dejar vacío para no cambiar"
                                {...register("password")}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" {...register("role")}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary w-48" onClick={() => navigate("/users")}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success w-48">
                                <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;