import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersRequest, deleteUserRequest } from "../api/users.js";
import { useAuth } from "../context/auth-context.js";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Carga los usuarios cuando el componente se monta
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error("Error al cargar usuarios", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUserRequest(id);
            // Recarga la lista tras eliminar sin necesidad de recargar la página
            loadUsers();
        } catch (error) {
            console.error("Error al eliminar usuario", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Usuarios</h2>
                <div>
                    <button className="btn btn-primary me-2" onClick={() => navigate("/users/create")}>
                        <i className="bi bi-plus-circle me-1"></i> Crear usuario
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => logout()}>
                        <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle text-center mb-0 border">
                    <thead className="table-dark">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Fecha de creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>{user.role}</span></td>
                                {/* Formatea la fecha de MongoDB a un formato legible */}
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/users/edit/${user._id}`)} title="Editar">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user._id)} title="Eliminar">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;