'use client';
import { usePreloadedUsers } from "@/src/hooks/user/usePreloadUser"; 
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { preloadUserApi } from "@/src/apis";
import { useAvailablePolla } from "@/src/hooks/polla/useAvailablePolla";

export default function ListPreloadUser() {
  const { data :pollas} = useAvailablePolla();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedPollaId, setSelectedPollaId] = useState<number>(-1);
  const { data :preloadedUsers , loading, error } = usePreloadedUsers(selectedPollaId);
  
  const handleSelectUser = (userId: string, isChecked: boolean) => {
    setSelectedUsers(prev => 
      isChecked 
        ? [...prev, userId] 
        : prev.filter(id => id !== userId)
    );
    console.log(selectedUsers);
  }

  const handleInviteUsers = async () => {
    const selectedUserObjects = Array.isArray(preloadedUsers)
      ? preloadedUsers.filter(user => selectedUsers.includes(user.id))
      : [];    try {
      await preloadUserApi.sendInvitationToPreloadUsers(selectedUserObjects);
      toast.success('¡Invitaciones enviadas con éxito!');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error al enviar invitaciones:', error);
      toast.error('Error al enviar invitaciones. Por favor, inténtelo de nuevo más tarde.');
    }  };

  const handlePollaChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedPollaId(Number(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
      {/* Sección de selección de Polla */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pollas disponibles</label>
        <div className="flex items-center space-x-4">
          <select
            onChange={handlePollaChange}
            value={selectedPollaId}
            className="block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          >
            <option value={-1}>Seleccione una Polla</option>
            {pollas.map((polla) => (
              <option key={polla.id} value={polla.id}>
                {polla.name || polla.startDate.toString().split('T')[0]} - {polla.endDate.toString().split('T')[0]}  
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de usuarios */}

      <div>
        {error ? (
          <div className="p-4 text-red-500">Error: {error.message}</div>
        ) : loading ? (
          <div className="p-4">Cargando usuarios...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Selección
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cédula
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Celular
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(Array.isArray(preloadedUsers) ? preloadedUsers : []).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`mailto:${user.mail}`} className="text-blue-600 hover:text-blue-900 hover:underline">
                        {user.mail}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phonenumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* Botón de enviar invitación */}
      {selectedUsers.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleInviteUsers}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar invitación
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      )}
    </div>
  </div>
  );

}