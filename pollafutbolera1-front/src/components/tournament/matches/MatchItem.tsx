'use client';

import { formatMatchDate, formatMatchTime } from "@/src/utils/match_format";
import  MatchStatsClient from "@/src/components/stats/MatchStatsClient";
import { Clock, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import Modal from "../../ui/Modal";
import ModalStats from "../../ui/ModalStats"
import { Match } from "@/src/interfaces/polla/match.interface";
import { Team } from "@/src/interfaces/polla/team.interface";

interface MatchItemProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  showNames?: boolean;      
}

const MatchItem = ({
  match,
  homeTeam,
  awayTeam,
  showNames = true,        
}: MatchItemProps) => {

  const [showModal, setShowModal] = useState(false);
  const matchDate = useMemo(() => new Date(match.date), [match.date]);
  const now = useMemo(() => new Date(), []);
  const isPast = matchDate.getTime() <= now.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const statsEnabled =
    isPast && now.getTime() - matchDate.getTime() >= twentyFourHours;

  const statusConfig = (() => {
    const base = "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm transition-all duration-200 ";
    switch (match.status) {
      case "Match Finished":
        return {
          className: base + "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm",
          text: "Terminado"
        };
      case "Match In Progress":
        return {
          className: base + "bg-red-100 text-red-700 border border-red-200 shadow-sm animate-pulse",
          text: "En vivo"
        };
      case "Not Started":
        return {
          className: base + "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm",
          text: "Programado"
        };
      default:
        return {
          className: base + "bg-gray-100 text-gray-700 border border-gray-200 shadow-sm",
          text: match.status
        };
    }
  })();

  const shortStatus =
    match.status === "Match Finished"
      ? "Terminado"
      : match.status === "Match In Progress"
      ? "En vivo"
      : match.status === "Match Scheduled"
      ? "Programado"
      : match.status;

   const openModal = () => {
    if (statsEnabled) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hasScore = match.homeScore != null && match.awayScore != null;
  const isNotStarted = match.status === "Not Started";

  const renderCenterContent = () => {
    if (isNotStarted) {
      // Para partidos que no han comenzado, mostrar la hora
      return (
        <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-xl border border-blue-100">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-lg font-bold text-blue-700 tracking-wide">
            {formatMatchTime(match.date)}
          </span>
        </div>
      );
    } else if (hasScore) {
      // Para partidos con resultado
      return (
        <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-2xl font-bold text-gray-800 tabular-nums">
            {match.homeScore}
          </span>
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="w-1 h-1 bg-gray-300 rounded-full mt-1" />
          </div>
          <span className="text-2xl font-bold text-gray-800 tabular-nums">
            {match.awayScore}
          </span>
        </div>
      );
    } else {
      // Para otros casos (ej: partido en progreso sin score actualizado)
      return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-xl border border-blue-100">
          <span className="text-lg font-bold text-gray-700 tracking-wide">VS</span>
        </div>
      );
    }
  };
  return (
    <div className="group relative border border-gray-200 rounded-2xl p-6 mb-4 bg-gradient-to-br from-white via-white to-gray-50/30 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header with date and status */}
      <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:justify-between text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{formatMatchDate(match.date)}</span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span className="hidden sm:inline font-medium">{formatMatchTime(match.date)}</span>
        </div>
        <span className={statusConfig.className}>{statusConfig.text}</span>
      </div>      
      <div className="flex items-center justify-between gap-4">
        
        {/* Home Team */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {showNames && (
            <span className="truncate font-semibold text-gray-800 text-right">
              {homeTeam.name}
            </span>
          )}
          {homeTeam.logoUrl ? (
            <img
              src={homeTeam.logoUrl}
              alt={homeTeam.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/48";
              }}
              className="w-12 h-12 rounded-full border transition-transform duration-200 hover:scale-110"
            />
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-gray-200 flex-shrink-0" />
          )}
        </div>

        {/* Score/VS/Time section */}
        <div className="flex items-center justify-center flex-shrink-0">
          {renderCenterContent()}
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-3 flex-1">
          {awayTeam.logoUrl ? (
            <img
              src={awayTeam.logoUrl}
              alt={awayTeam.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/48";
              }}
              className="w-12 h-12 rounded-full border transition-transform duration-200 hover:scale-110"
            />
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-gray-200 flex-shrink-0" />
          )}
          {showNames && (
            <span className="truncate font-semibold text-gray-800">
              {awayTeam.name}
            </span>
          )}
        </div>
      </div>      {/* Statistics button */}
      {statsEnabled && (
        <div className="relative flex justify-center mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={openModal}
            className="flex items-center gap-2 text-gray-700 border border-gray-700 hover:bg-gray-100 rounded-md text-xs px-4 py-1.5 transition disabled:opacity-50 group/btn"
          >
            <TrendingUp className="h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-12" />
            <span>Ver estadísticas</span>
          </button>
        </div>
      )}

      <ModalStats isOpen={showModal} onClose={closeModal}>
        <MatchStatsClient fixtureId={String(match.id)} />
      </ModalStats>
    </div>
  );
};

export default MatchItem;