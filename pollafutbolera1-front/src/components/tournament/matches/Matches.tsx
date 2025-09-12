'use client';
import React, { useEffect, useState } from "react";
import { formatMatchDate } from "@/src/utils/match_format";
import MatchItem from "@/src/components/tournament/matches/MatchItem";
import { Match, Team, TournamentBet } from "@/src/interfaces/polla";
import { Tournament } from "@/src/interfaces/polla";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { pollaService } from "@/src/apis";
import toast from "react-hot-toast";


interface MatchesProps {
  teams: Team[];
  matches: Match[];
  tournament: Tournament | null,
  pollaId: string | string[] | undefined;
  tournamentBet : TournamentBet | null;
}

const Matches: React.FC<MatchesProps> = ({ teams, matches, tournament, pollaId }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [winnerTeamId, setWinnerTeam] = useState<number>(-1);
  const [scorerTeamId, setScorerTeam] = useState<number>(-1);
  const [finalData, setFinalData] = useState<Date>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

 if (!matches?.length) {
    return (
      <div className="py-4 text-center text-gray-600">
        <img
          src="/pollas/sad-chicken.png"
          alt="Sad chicken"
          className="mx-auto mb-4 w-32 h-32 opacity-50 filter grayscale"
        />
        No hay partidos disponibles.
      </div>
    );
  }

  
  const mappedMatches = matches.map((match) => {
    const homeTeam =
      teams.find((t) => String(t.id) === String(match.homeTeamId)) || {
        id: match.homeTeamId,
        name: "Equipo desconocido",
        logoUrl: "https://via.placeholder.com/64",
      };
    const awayTeam =
      teams.find((t) => String(t.id) === String(match.awayTeamId)) || {
        id: match.awayTeamId,
        name: "Equipo desconocido",
        logoUrl: "https://via.placeholder.com/64",
      };
    return { ...match, homeTeam, awayTeam };
  });

  
  const sortedMatches = mappedMatches.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  
  const totalPages = Math.ceil(sortedMatches.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const pageMatches = sortedMatches.slice(startIdx, startIdx + pageSize);

  
  const groupedPage = pageMatches.reduce<Record<string, typeof pageMatches>>(
    (acc, m) => {
      const date = formatMatchDate(m.date);
      if (!acc[date]) acc[date] = [];
      acc[date].push(m);
      return acc;
    },
    {}
  );  const dates = Object.keys(groupedPage).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Helper functions
  const getWinnerTeamName = () => {
    const team = teams.find(t => t.id === winnerTeamId);
    return team?.name || "No seleccionado";
  };

  const getScorerTeamName = () => {
    const team = teams.find(t => t.id === scorerTeamId);
    return team?.name || "No seleccionado";
  };

  const handlePredictionClick = () => {
    if (winnerTeamId === -1 || scorerTeamId === -1) {
      toast.error("Por favor selecciona tanto el equipo ganador como el equipo goleador");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const confirmPrediction = async () => {
    setIsSubmitting(true);
    let pollaIdNumber: number = -1;
    if (typeof pollaId === "string") {
      pollaIdNumber = parseInt(pollaId, 10);
    } else if (Array.isArray(pollaId) && pollaId.length > 0) {
      pollaIdNumber = parseInt(pollaId[0], 10);
    }
    
    console.log("winnerTeamId", winnerTeamId);
    console.log("scorerTeamId", scorerTeamId);
    
    try {
      const response = await pollaService.postTournamentBet(tournament?.id || -1, pollaIdNumber, winnerTeamId, scorerTeamId);
      console.log("status", response.status);
      if (response.status === 200) {
        console.log("Predicción guardada correctamente");
        toast.success(`Predicción guardada correctamente! Por favor recarga la página para ver los cambios.`);
        setIsConfirmModalOpen(false);
      }
    } catch (error: any) {
      console.log("error", error.response?.status);
      if (error.response?.status === 409) {
        console.error("Error al guardar la predicción: ", error.response.data);
        toast.error("Ya has realizado una predicción para este torneo.");
      } else {
        console.error("Error desconocido:", error);
        toast.error("Ocurrió un error al guardar la predicción.");
      }
      setIsConfirmModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <div className="my-8 space-y-8">
      
      {tournament?.initial_date && new Date() < new Date(tournament.initial_date) &&(
        <>        
        <p className="text-2xl font-semibold mb-4">Seleccionar equipo ganador</p>
        <Select onValueChange={(value) => setWinnerTeam(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona El equipo ganador" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Equipos</SelectLabel>
            
            {teams.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={team.logoUrl} alt={team.name} />
                      <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>{team.name}</div>
                  </div>
                </SelectItem>
            ))}
            
          </SelectGroup>
        </SelectContent>
      </Select>      

      <p className="text-2xl font-semibold mb-4">Seleccionar equipo goleador</p>
      <Select onValueChange={(value) => setScorerTeam(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona El equipo Goleador" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Equipos</SelectLabel>
            {teams.map((team) => (
              <SelectItem key={team.id} value={String(team.id)}>
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={team.logoUrl} alt={team.name} />
                      <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>{team.name}</div>
                  </div>
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePredictionClick}
          disabled={isSubmitting}
          className="justify-right bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Hacer predicción'}
        </button>
      </div>
      </>
      )}{(
        <></>
      )}
      
      {dates.map((date) => (
      <div key={date}>
        <h3 className="text-2xl font-semibold mb-4">{date}</h3>
        <div className="flex flex-col space-y-4">
        {groupedPage[date].map((m) => (
          <MatchItem
          key={m.id}
          match={m}
          homeTeam={m.homeTeam}
          awayTeam={m.awayTeam}
          />
        ))}

        </div>
      </div>
      ))}
        
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Modal de Confirmación */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Confirmar Predicción
                </h2>
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>

              {/* Predicción Summary */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4 text-center">
                  Tu Predicción para el Torneo
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium text-gray-700">Equipo Ganador:</span>
                    <div className="flex items-center">
                      {teams.find(t => t.id === winnerTeamId) && (
                        <>
                          <img
                            src={teams.find(t => t.id === winnerTeamId)?.logoUrl}
                            alt={getWinnerTeamName()}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-bold text-blue-600">{getWinnerTeamName()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium text-gray-700">Equipo Goleador:</span>
                    <div className="flex items-center">
                      {teams.find(t => t.id === scorerTeamId) && (
                        <>
                          <img
                            src={teams.find(t => t.id === scorerTeamId)?.logoUrl}
                            alt={getScorerTeamName()}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-bold text-green-600">{getScorerTeamName()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm text-center">
                  ⚠️ Una vez confirmada tu predicción, deberás recargar la página para ver los cambios reflejados.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                
                <button
                  onClick={confirmPrediction}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Guardando...' : 'Confirmar Predicción'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
