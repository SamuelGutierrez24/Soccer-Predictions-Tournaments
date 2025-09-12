"use client";
import { Polla } from "@/src/interfaces/polla.interface";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pollaService } from "@/src/apis";
import { DeleteConfirmModal } from "@/src/components/modals/DeleteModal";
import { RankingModal } from "@/src/components/modals/RankingModal";
import { Trophy } from "lucide-react";
import SoccerLoader from "@/src/components/ui/SoccerLoader";

const getCurrentUserFromCookies = (): number | null => {
  const userCookie = Cookies.get("currentUser");
  return userCookie ? JSON.parse(userCookie).company : null;
};

function AdminPage() {
  const [user, setUser] = useState<number | null>(getCurrentUserFromCookies);
  const [pollas, setPollas] = useState<Polla[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [selectedPolla, setSelectedPolla] = useState<Polla | null>(null);
  const router = useRouter();

  const handleDeleteClick = (polla: Polla) => {
    setSelectedPolla(polla);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPolla) return;
    setIsDeleteModalOpen(false);
    setIsRankingModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (user === null) return;
        const response = await pollaService.getPollasByCompanyId(user);
        console.log("Pollas:", response);

        setPollas(response);
      } catch (error) {
        console.error("Error fetching pollas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  console.log("Pollas:", pollas);

    // if (loading) {
    //   return (
    //     <div className="flex items-center justify-center h-64">
    //       <SoccerLoader />
    //     </div>
    //   );
    // }

  return (
    <div className="px-6 pt-8 pb-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
        Panel de Pollas
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <SoccerLoader />
        </div>
      ) : pollas.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No hay pollas disponibles en este momento.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Torneo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Fecha Inicio
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Fecha Fin
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pollas.map((polla) => (
                <tr
                  key={polla.id}
                  onClick={() => router.push(`/admin/${polla.id}`)}
                  className="hover:bg-blue-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 text-blue-600 font-medium underline">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    {polla.tournament.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    {new Date(polla.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm">
                    {new Date(polla.endDate).toLocaleDateString()}
                  </td>
                  <td
                    className="px-6 py-4 text-right flex justify-end space-x-2"
                    // Evita que el botón dispare el click de la fila
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleDeleteClick(polla)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-md text-sm font-medium transition"
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
{/* 
      <RankingModal
        isOpen={isRankingModalOpen}
        onClose={() => setIsRankingModalOpen(false)}
        polla={selectedPolla}
      /> */}
    </div>
  );
}

export default AdminPage;
