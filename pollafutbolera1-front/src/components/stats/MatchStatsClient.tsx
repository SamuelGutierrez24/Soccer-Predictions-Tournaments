"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { TeamStats } from "@/src/interfaces/team-stadistics";
import { getAuthorizationHeader } from "@/src/apis/getAuthorizationHeader";

interface Props {
  fixtureId: string;
}

const spanishTranslation: Record<string, string> = {
  "Shots On Goal": "Tiros a puerta",
  "Shots Off Goal": "Tiros fuera",
  "Total Shots": "Tiros totales",
  "Blocked Shots": "Tiros bloqueados",
  "Shots Insidebox": "Tiros dentro del área",
  "Shots Outsidebox": "Tiros fuera del área",
  "Fouls": "Faltas",
  "Corner Kicks": "Tiros de esquina",
  "Offsides": "Fuera de lugar",
  "Ball Possession": "Posesión del balón",
  "Yellow Cards": "Tarjetas amarillas",
  "Red Cards": "Tarjetas rojas",
  "Goalkeeper Saves": "Atajadas del portero",
  "Total Passes": "Pases totales",
  "Passes accurate": "Pases precisos",
  "Passes Accurate": "Pases precisos",
  "Passes %": "Precisión de pases",
};

export default function MatchStatsClient({ fixtureId }: Props) {
  const [stats, setStats] = useState<TeamStats[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = getAuthorizationHeader().Authorization;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/fixture/stats/${fixtureId}`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
              "X-TenantId": "1",
            },
          }
        );
        
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching match stats:", error);
        setError("Error al cargar las estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [fixtureId]);

  const parseValue = (value: string | null): number => {
    if (!value) return 0;
    return parseFloat(value.replace("%", "")) || 0;
  };

  const formatDisplay = (value: string | null): string => {
    return value ?? "0";
  };

  // Memoizar los datos procesados para evitar recálculos
  const processedStats = useMemo(() => {
    if (!stats || stats.length < 2) return null;

    const [home, away] = stats;
    
    return home.statistics
      .map((stat, index) => {
        if (stat.type === "Passes %" || stat.type === "Passes Accurate") return null;

        const homeRaw = stat.value;
        const awayRaw = away.statistics[index]?.value;

        const leftValue = parseValue(homeRaw);
        const rightValue = parseValue(awayRaw);
        const total = leftValue + rightValue;

        const leftPercent = total > 0 ? (leftValue / total) * 100 : 0;
        const rightPercent = total > 0 ? (rightValue / total) * 100 : 0;

        const translatedType = spanishTranslation[stat.type] ?? stat.type;

        return {
          type: stat.type,
          translatedType,
          homeValue: formatDisplay(homeRaw),
          awayValue: formatDisplay(awayRaw),
          leftPercent,
          rightPercent,
        };
      })
      .filter(Boolean);
  }, [stats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="ml-3 text-gray-600">Cargando estadísticas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!stats || stats.length < 2 || !processedStats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay estadísticas disponibles para este partido.</p>
      </div>
    );
  }

  const [home, away] = stats;

  return (
    <div className="space-y-6">
      {/* Encabezado: logos y nombres */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={home.team.logo} 
            alt={home.team.name} 
            className="w-10 h-10 rounded-full border-2 border-blue-100"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-blue-600 font-bold text-lg">{home.team.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-red-600 font-bold text-lg">{away.team.name}</span>
          <img 
            src={away.team.logo} 
            alt={away.team.name} 
            className="w-10 h-10 rounded-full border-2 border-red-100"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="space-y-4">
        {processedStats.map((stat) => {
          if (!stat) return null;
          
          return (
            <div key={stat.type} className="bg-gray-50/50 rounded-lg p-4">
              <div className="grid grid-cols-3 text-sm font-semibold text-gray-800 mb-3">
                <div className="text-blue-600 text-left">{stat.homeValue}</div>
                <div className="text-center font-medium">{stat.translatedType}</div>
                <div className="text-red-600 text-right">{stat.awayValue}</div>
              </div>

              <div className="relative h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="absolute left-1/2 top-0 h-full bg-gradient-to-l from-blue-500 to-blue-600 rounded-l-full transition-all duration-300"
                  style={{ width: `${stat.leftPercent}%`, transform: "translateX(-100%)" }}
                />
                <div
                  className="absolute left-1/2 top-0 h-full bg-gradient-to-r from-red-500 to-red-600 rounded-r-full transition-all duration-300"
                  style={{ width: `${stat.rightPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}