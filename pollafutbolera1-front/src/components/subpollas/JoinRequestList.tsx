import React, { useState, useMemo, useEffect } from "react";
import { SearchInput } from "../ui/SearchInput";
import { JoinRequestRow } from "./JoinRequestRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Cookies from "js-cookie";
import { getSubPollasByCreatorUserId, getJoinRequestsBySubpolla, respondToJoinRequest } from "../../hooks/subpolla/useSubpolla";
import { useGetUserById } from "../../hooks/auth/useGetUserById";

interface JoinRequest {
  id: number;
  userName: string;
  status: "pending" | "accepted" | "rejected";
}

export const JoinRequestList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const currentUser = Cookies.get("currentUser");
      if (!currentUser) {
        setRequests([]);
        setLoading(false);
        return;
      }
      const userId = JSON.parse(currentUser).userId;
      const subpollas = await getSubPollasByCreatorUserId(userId);
      let allRequests: JoinRequest[] = [];
      for (const subpolla of subpollas) {
        // Obtains the join requests using the hook
        const joinRequests = await getJoinRequestsBySubpolla(subpolla.id);
        for (const req of joinRequests) {
          let nickname = String(req.userId);
          try {
            // Obtains the nickname of the user
            const user = await useGetUserById(req.userId);
            nickname = user.nickname || String("Nombre no disponible");
          } catch {
            nickname = String("Nombre no disponible");
          }
          allRequests.push({
            id: req.id,
            userName: nickname,
            status: req.status.toLowerCase(),
          });
        }
      }
      setRequests(allRequests);
    } catch (err) {
      setRequests([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRespond = async (requestId: number, decision: "ACCEPT" | "REJECT") => {
    await respondToJoinRequest(requestId, decision);
    await fetchRequests();
  };

  const filteredData = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.userName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ||
        item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, requests]);

  return (
    <div className="shadow-[6px_6px_54px_rgba(0,0,0,0.05)] bg-white p-[30px] rounded-xl max-sm:p-[15px]">
      <div>
        <div className="flex justify-between items-center mb-[30px] max-md:flex-col max-md:gap-5">
          <div className="text-2xl font-bold text-[#202224]">
            Lista de solicitudes de unión
          </div>
          <div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-[#202224] font-semibold hover:bg-[#E0E4EA] transition-colors">
              <a href="/subpollas/usuarios">Usuarios</a>
            </button>
          </div>
          <div className="flex items-center gap-4 max-md:w-full">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            >
              <SelectTrigger className="w-[180px] max-md:w-full">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="accepted">Aceptado</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
              </SelectContent>
            </Select>
            <SearchInput 
              onChange={setSearchTerm}
              placeholder="Buscar por nombre de usuario" 
            />
          </div>
        </div>

        <div className="grid grid-cols-[0.5fr_0.5fr_0.7fr] bg-[#F1F4F9] px-[20px] py-2.5 rounded-xl max-md:grid-cols-[1fr_1fr] max-md:gap-2.5 max-md:p-2.5 max-sm:grid-cols-[1fr] max-sm:gap-[5px] max-sm:p-2 text-center items-center">
          <div className="text-xs font-bold text-[#202224] truncate">
            Nombre Usuario
          </div>
          <div className="text-xs font-bold text-[#202224] truncate">
            Estado
          </div>
          <div className="text-xs font-bold text-[#202224] truncate">
            Acción
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center py-8">Cargando...</div>
        ) : (
          filteredData.map((item) => (
            <JoinRequestRow 
              key={item.id}
              userName={item.userName}
              status={item.status as any}
              onAccept={() => handleRespond(item.id, "ACCEPT")}
              onReject={() => handleRespond(item.id, "REJECT")}
            />
          ))
        )}
      </div>
    </div>
  );
};
