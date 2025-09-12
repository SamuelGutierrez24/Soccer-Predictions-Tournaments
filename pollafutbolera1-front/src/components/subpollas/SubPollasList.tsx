import React, { useState, useMemo, useEffect } from "react";
import { SearchInput } from "../ui/SearchInput";
import { SubPollaRow } from "./SubpollasRow";
import Cookies from "js-cookie";
import { getPollaIdsByUserId, getSubPollasByPollaId } from "../../hooks/subpolla/useSubpolla";
import { getPollaById } from "../../hooks/polla/usePolla";
import { useGetUserById } from "../../hooks/auth/useGetUserById";

interface SubPollaListItem {
  userName: string;
  company: string;
  subPollaId: string;
}

export const SubPollasList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subpollas, setSubpollas] = useState<SubPollaListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubpollas = async () => {
      setLoading(true);
      try {
        const currentUser = Cookies.get("currentUser");
        if (!currentUser) {
          setSubpollas([]);
          setLoading(false);
          return;
        }
        const userId = JSON.parse(currentUser).userId;
        const pollaIds: number[] = await getPollaIdsByUserId(Number(userId));
        let allSubpollas: SubPollaListItem[] = [];
        for (const pollaId of pollaIds) {
          // Obtains the subpollas using the hook to get the company name
          const subpollasData = await getSubPollasByPollaId(pollaId);
          // Obtains the company name using the hook
          let companyName = "Sin compañía";
          try {
            const polla = await getPollaById(String(pollaId));
            companyName = polla?.company?.name || "Sin compañía";
          } catch {
            companyName = "Sin compañía";
          }
          for (const sp of subpollasData) {
            // Obtener nickname usando el hook
            let nickname = String(sp.userId);
            try {
              const user = await useGetUserById(sp.userId);
              nickname = user.nickname || "Nombre no disponible";
            } catch {
              nickname = "Nombre no disponible";
            }
            allSubpollas.push({
              userName: nickname,
              company: companyName,
              subPollaId: String(sp.id),
            });
          }
        }
        setSubpollas(allSubpollas);
      } catch (err) {
        setSubpollas([]);
      }
      setLoading(false);
    };
    fetchSubpollas();
  }, []);

  const filteredData = useMemo(() => {
    return subpollas.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, subpollas]);

  return (
    <div className="shadow-[6px_6px_54px_rgba(0,0,0,0.05)] bg-white p-[30px] rounded-xl max-sm:p-[15px]">
      <div>
        <div className="flex justify-between items-center mb-[30px] max-md:flex-col max-md:gap-5">
          <div className="text-2xl font-bold text-[#202224]">
            Lista De SubPollas Disponibles
          </div>
          <div className="flex items-center gap-4 max-md:w-full">
            <SearchInput 
              onChange={setSearchTerm}
              placeholder="Buscar por usuario o compañía" 
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#F1F4F9] px-[26px] py-4 rounded-xl text-center max-md:grid-cols-[1fr_1fr] max-md:gap-2.5 max-md:p-2.5 max-sm:grid-cols-[1fr] max-sm:gap-[5px] max-sm:p-2">
          <div className="text-sm font-bold text-[#202224] max-md:text-xs">
            Nombre Usuario
          </div>
          <div className="text-sm font-bold text-[#202224] max-md:text-xs">
            Compañia
          </div>
          <div className="text-sm font-bold text-[#202224] max-md:text-xs">
            Acción
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center py-8">Cargando...</div>
        ) : (
          filteredData.map((item, index) => (
            <SubPollaRow
              key={item.subPollaId}
              userName={item.userName}
              company={item.company}
              subPollaId={item.subPollaId}
            />
          ))
        )}
      </div>
    </div>
  );
};
