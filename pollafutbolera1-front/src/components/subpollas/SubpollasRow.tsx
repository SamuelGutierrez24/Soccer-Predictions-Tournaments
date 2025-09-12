import React from "react";
import Cookies from "js-cookie";
import { createSubpollaJoinRequest } from "../../hooks/subpolla/useSubpolla";

interface SubPollaRowProps {
  userName: string;
  company: string;
  subPollaId: string;
}

export const SubPollaRow: React.FC<SubPollaRowProps> = ({
  userName,
  company,
  subPollaId,
}) => {
  const handleJoinRequest = async () => {
    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
      alert("Debes iniciar sesión para solicitar unirte.");
      return;
    }
    const userId = JSON.parse(currentUser).userId;
    try {
      // Send the join request using the hook
      await createSubpollaJoinRequest({
        userId: Number(userId),
        subpollaId: Number(subPollaId),
      });
      alert("Solicitud enviada correctamente.");
    } catch (error) {
      alert("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="grid grid-cols-3 px-4 py-3 border-b border-gray-300 text-center items-center justify-items-center">
      <div className="text-sm font-semibold text-[#202224] opacity-80">
        {userName}
      </div>
      <div className="text-sm font-semibold text-[#202224] opacity-80">
        {company}
      </div>
      <div className="text-sm font-semibold text-[#202224] opacity-80">
        <button
          className="text-white text-sm font-bold cursor-pointer bg-[#F97316] px-3 py-1 rounded-lg"
          data-subpolla-id={subPollaId}
          onClick={handleJoinRequest}
        >
          Solicitar unirse
        </button>
      </div>
    </div>
  );
};
