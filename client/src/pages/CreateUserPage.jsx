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
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-header bg-white pb-0 border-bottom-0 mt-3">
                    <h2 className="text-center">Crear Usuario</h2>
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
                            <input
                                type="password"
                                className="form-control"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <small className="text-danger mt-1">La contraseña es requerida</small>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Role</label>
                            {/* Select para limitar los valores al enum definido en el modelo */}
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
                                <i className="bi bi-floppy me-1"></i> Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUserPage;