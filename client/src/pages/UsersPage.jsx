import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersRequest, deleteUserRequest } from "../api/users.js";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

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
        <div>
            <h1>Usuarios</h1>

            <button onClick={() => navigate("/users/create")}>
                Crear usuario
            </button>

            <table>
                <thead>
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
                            <td>{user.role}</td>
                            {/* Formatea la fecha de MongoDB a un formato legible */}
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => navigate(`/users/edit/${user._id}`)}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(user._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;