import React, { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { UserCard } from "./UserCard";
import { userApi } from "@/src/apis";
import { User } from "@/src/interfaces/user.interface";

interface AdminSelectionStepProps {
  adminId: number | null;
  setAdminId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function AdminSelectionStep({ adminId, setAdminId }: AdminSelectionStepProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const usersData = await userApi.getUsersByDefaultCompany();
        setUsers(usersData);
      } catch (err) {
        setError("Error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Asignar Administrador
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Selecciona un usuario como administrador de la empresa
      </p>

      <div className="self-start w-full mt-8">
        <label className="text-lg font-semibold text-black">Buscar Usuario</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nickname o cedula"
          className="flex shrink-0 w-full mt-2 bg-white text-black border border-solid border-[color:var(--Neutral-300,#EFF0F6)] shadow-sm h-[66px] rounded-[46px] p-4"
        />
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-500 text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto">
          {filteredUsers.map(user => (
            <div 
              key={user.userId} 
              className={`relative cursor-pointer border-2 rounded-xl p-4 transition-all ${
                adminId === user.userId
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setAdminId(user.userId)}
            >
              <UserCard user={user} />
              {adminId === user.userId && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <CheckIcon fontSize="small" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          {users.length === 0 
            ? "No hay usuarios disponibles" 
            : "No se encontraron usuarios que coincidan con la búsqueda"}
        </div>
      )}
    </div>
  );
}