"use client";
import { useCurrentUser } from "@/src/hooks/auth/userCurrentUser"; 

import React, { useEffect, useState } from "react";
import { Match as BracketMatchComponent, SingleEliminationBracket, createTheme } from '@replydev/react-tournament-brackets';
import { Stage, Team, Match as APIMatch, Match } from "@/src/interfaces/polla";

const whiteTheme = createTheme({
   textColor: {
    main: "#1F2937",         // Gris oscuro
    highlighted: "#2563EB",  // Azul suave (resaltados)
    dark: "#111827",         // Negro suave
  },
  matchBackground: {
    wonColor: "#E0F2FE",     // Azul muy claro
    lostColor: "#F9FAFB",    // Gris muy claro
  },
  roundHeader: { backgroundColor: '#2563EB', fontColor: '#93C5FD'},
  score: {
    background: {
      wonColor: "#93C5FD",   // Azul claro
      lostColor: "#E5E7EB",  // Gris claro
    },
    text: {
      highlightedWonColor: "#16A34A",  // Verde calmado
      highlightedLostColor: "#DC2626", // Rojo suave
    },
  },
  border: {
    color: "#E5E7EB",             // Gris claro
    highlightedColor: "#60A5FA",  // Azul claro
  },
  connectorColor: "#D1D5DB",           // Gris suave
  connectorColorHighlight: "#2563EB",  // Azul
  svgBackground: "#FFFFFF",      
});

// Transforma los datos de la API al formato del bracket
const transformMatchesForBracket = (matchesData: APIMatch[], teamsData: Team[], stagesData: Stage[]) => {
  const matchesByStage: { [key: number]: Match[] } = {};

  for (const match of matchesData) {
    if (!matchesByStage[match.stageId]) {
      matchesByStage[match.stageId] = [];
    }
    matchesByStage[match.stageId].push(match);
  }

  const sortedStageIds = Object.keys(matchesByStage)
    .map(Number)
    .sort((a, b) => a - b);

  const allTransformed = [];

  for (let i = 0; i < sortedStageIds.length; i++) {
    const currentStageId = sortedStageIds[i];
    const nextStageId = sortedStageIds[i + 1];
    const currentMatches = matchesByStage[currentStageId] || [];
    const nextMatches = matchesByStage[nextStageId] || [];

    for (let j = 0; j < currentMatches.length; j++) {
      const match = currentMatches[j];
      const stageName =
        stagesData.find((s) => s.id === match.stageId)?.stageName || "Stage";

      const nextMatch = nextMatches[Math.floor(j / 2)];

      const homeTeam = teamsData.find((t) => t.id === match.homeTeamId);
      const awayTeam = teamsData.find((t) => t.id === match.awayTeamId);

      const transformedMatch = {
        id: match.id.toString(),
        name: stageName,
        startTime: match.date,
        state: match.status === "FINISHED" ? "DONE" : "SCHEDULED",
        tournamentRoundText: stageName,
        nextMatchId: nextMatch ? nextMatch.id.toString() : null,
        participants: [
          {
            id: homeTeam?.id.toString() ?? "home",
            name: homeTeam?.name ?? "Home",
            resultText: match.homeScore?.toString() ?? "-",
            isWinner: match.winnerTeamId === homeTeam?.id,
            status: match.status === "FINISHED" ? "PLAYED" : null,
          },
          {
            id: awayTeam?.id.toString() ?? "away",
            name: awayTeam?.name ?? "Away",
            resultText: match.awayScore?.toString() ?? "-",
            isWinner: match.winnerTeamId === awayTeam?.id,
            status: match.status === "FINISHED" ? "PLAYED" : null,
          },
        ],
      };

      allTransformed.push(transformedMatch);
    }
  }

  return allTransformed;
};

type BracketMatch = {
  id: string;
  name: string;
  startTime: string;
  state: string;
  tournamentRoundText: string;
  nextMatchId: string | null;
  participants: {
    id: string;
    name: string;
    resultText: string;
    isWinner: boolean;
    status: string | null;
  }[];
};

const BracketComponent = () => {
  const { user } = useCurrentUser();
  const [bracketData, setBracketData] = useState<BracketMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {

    if (!user?.accessToken) {
      setError("Autorizacion fallida");
      return;
    }

    try {
      const [matchesRes, teamsRes, stagesRes] = await Promise.all([
        fetch("http://localhost:8000/pollafutbolera/api/matches", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }),
        fetch("http://localhost:8000/pollafutbolera/api/teams", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }),
        fetch("http://localhost:8000/pollafutbolera/stages/tournament/15", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }),
      ]);

      if (!matchesRes.ok || !teamsRes.ok || !stagesRes.ok) {
        throw new Error("Error de autenticación o conexión");
      }

      const [matches, teams, stages] = await Promise.all([
        matchesRes.json(),
        teamsRes.json(),
        stagesRes.json(),
      ]);

      const bracket = transformMatchesForBracket(matches, teams, stages);
      setBracketData(bracket);
    } catch (err) {
      console.error("Error al obtener datos del bracket:", err);
      setError("No se pudo cargar el bracket. Verifica tu sesión.");
    }
  };

  if (user) {
    fetchData();
  }
}, [user]); // 👈 importante: depende de user


  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (bracketData.length === 0) {
    return <div className="text-gray-500 p-4">Cargando bracket...</div>;
  }

  return (
    <div className="p-4 overflow-auto">
      <SingleEliminationBracket
  matches={bracketData}
  matchComponent={BracketMatchComponent} // This expects a component, not a type
  theme={whiteTheme}
  options={{
    style: {
      roundHeader: {
        backgroundColor: whiteTheme.roundHeaders.background,
      },
      // Removed connectorColor and connectorColorHighlight as they are not part of ThemeType
    },
  }}
/>
    </div>
  );
};

export default BracketComponent;
