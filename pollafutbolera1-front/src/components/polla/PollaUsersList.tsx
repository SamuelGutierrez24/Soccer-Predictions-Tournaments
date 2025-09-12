"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/src/interfaces/user.interface";
import { userApi, userScoresPollaApi } from "@/src/apis";
import { useCurrentUser } from '@/src/hooks/auth/userCurrentUser';
import Cookies from 'js-cookie';
import SoccerLoader from '../ui/SoccerLoader';

interface PollaUsersListProps {
  pollaId: number;
}

export default function PollaUsersList({ pollaId }: PollaUsersListProps) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const { user: currentUser } = useCurrentUser();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // const res = usersData;
        const res = await userApi.getUsersByPollaId(pollaId);
        if (res) setUsers(res);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [pollaId]);

  const handleBan = async (banUser: User) => {
    try {
      
      if(!currentUser) return
      const res = await userApi.banUserFromPolla(Number(banUser.userId), pollaId);

      if (res === true) {
        setPopup({ message: `${banUser.nickname} baneado con éxito`, visible: true });
      }
    } catch (error) {
      setPopup({ message: `Error al intentar banear ${banUser.nickname}`, visible: true });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.nickname.toLowerCase().includes(search.toLowerCase())
  );

  // Cálculo de la paginación
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Show loading state
  if (isLoading) {
    return <SoccerLoader />;
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-lg text-table-text font-bold">Participantes de la Polla</h2> */}
          <input
            type="text"
            placeholder="Search by nickname"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reiniciar a la primera página al buscar
            }}
            className="bg-search-box text-table-text p-2 border border-gray-300 rounded-xl w-72"
          />
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-table-header text-left text-table-text font-medium">
              <th className="p-3">Nickname</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Cedula</th>
              <th className="p-3">Telefono</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="text-table-text font-extralight hover:bg-search-box">
                <td className="p-3 flex items-center space-x-3">
                  <Image
                    src={user.photo}
                    alt={user.nickname}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{user.nickname}</span>
                </td>
                <td className="p-3">{user.name} {user.lastName}</td>
                <td className="p-3">{user.mail}</td>
                <td className="p-3">{user.cedula}</td>
                <td className="p-3">{user.phoneNumber}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleBan(user)}
                    className="px-3 py-1 text-white text-sm rounded-full bg-ban-button hover:bg-table-text"
                  >
                    Banear
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-table-text p-3">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Controles de paginación */}
        {filteredUsers.length > usersPerPage && (
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            >
              Anterior
            </button>
            <span className="self-center text-table-text">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {popup.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-800">{popup.message}</p>
            <button
              onClick={() => setPopup({ ...popup, visible: false })}
              className="mt-4 px-4 py-2 bg-indigo-800 text-white rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}