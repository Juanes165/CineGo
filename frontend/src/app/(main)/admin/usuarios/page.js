'use client';
import { useEffect, useState } from "react";
import { ToggleUserModal } from "@/components";
import { getUsersService } from "@/services";
import { phoneParse } from "@/utils/phoneParse";
import { toggleActiveUserService } from "@/services";

export default function UsersPage(){

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getUsersService()
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    const handleToggleActive = (id) => {
        toggleActiveUserService(id)
        .then(() => {
            const updatedUsers = users.map((user) => {
                if (user.id === id) {
                    return {
                        ...user,
                        is_active: !user.is_active
                    }
                }
                return user;
            });
            setUsers(updatedUsers);
        })
        .catch((error) => {
            console.error(error);
        })
        setShowModal(false);
    }


    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold text-center mb-8">Listado de usuarios</h1>
            <section className="px-4 py-4 overflow-auto">
            <table className="table-auto w-full px-16">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="border px-4 py-4 text-lg">Nombre</th>
                        <th className="border px-4 py-4 text-lg">Apellido</th>
                        <th className="border px-4 py-4 text-lg">Correo electrónico</th>
                        <th className="border px-4 py-4 text-lg">Celular</th>
                        <th className="border px-4 py-4 text-lg">Rol</th>
                        <th className="border px-4 py-4 text-lg">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr className="bg-gray-900/5 dark:bg-white/10" key={user.id}>
                            <td className="border px-2 py-3">{user.name}</td>
                            <td className="border px-2 py-3">{user.last_name}</td>
                            <td className="border px-2 py-3">{user.email}</td>
                            <td className="border px-2 py-3 text-center">{phoneParse(user.phone)}</td>
                            <td className="border px-2 py-3 text-center">{user.is_admin ? 'Administrador' : 'Cliente'}</td>
                            <td className="border px-2 py-3 text-center">
                                <button
                                    type="button"
                                    className={`${user.is_active ? 'text-red-500' : 'text-green-500'}`}
                                    onClick={() => {setShowModal(true); setCurrentUser(index)}}
                                >
                                    {user.is_active ? 'Inhabilitar' : 'Habilitar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </section>
            {showModal && <ToggleUserModal isActive={users[currentUser].is_active} setShowModal={setShowModal} handleToggle={() => handleToggleActive(users[currentUser].id)} />}
        </div>
    )
}