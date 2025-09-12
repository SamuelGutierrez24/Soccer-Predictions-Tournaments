"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { get } from "http";
import { getSubPollasByCreatorUserId, getUsersOfSubPolla, removeUserFromSubPolla } from "@/src/hooks/subpolla/useSubpolla";
import { User } from "@/src/interfaces/user.interface";
import { set } from "date-fns";
import { UserSubPolla } from "@/src/interfaces/user_subpolla.interface";


export const UsersList = () => {
    
    const [users, setUsers] = useState<UserSubPolla[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subpollaId, setSubpollaId] = useState<number | undefined>(undefined);
    const currentUser = Cookies.get("currentUser");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                if (!currentUser) {
                    setUsers([]);
                    return;
                }
                getSubPollasByCreatorUserId(JSON.parse(currentUser).userId)
                    .then((subpollas) => {
                        console.log("Subpollas:", subpollas);
                        setSubpollaId(subpollas[0].id);
                        getUsersOfSubPolla(subpollas[0].id)
                            .then((response) => {
                                if (response && response.length > 0) {
                                    setUsers(response);
                                }
                                else {
                                    setUsers([]);
                                }
                            })
                            .catch((err) => {
                                setError(err.message || "Error al cargar los usuarios");
                            });
                    });
            } catch (err: any) {
                setError(err.message || "Error al cargar los usuarios");
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);


    const handleDeleteUser = async (userId: number) => {
        try {
            if (!subpollaId) {
                throw new Error("Subpolla ID is not defined");
            }
            await

            await removeUserFromSubPolla(subpollaId, userId);
            window.location.reload();

        } catch (error) {
            console.error("Error removing user:", error);
            setError("Error al eliminar el usuario");
        }
    };





    return (
        <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Mange Users</h2>
        <ul className="space-y-2">
            {users.map((user) => (
            <li
                key={user.userId}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded "
                
            >
                <span className="font-medium">{user.username}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
                <button className="text-blue-500 cursor-pointer hover:cursor-pointer"
                 onClick={() => handleDeleteUser(user.userId)}>
                    Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
    }