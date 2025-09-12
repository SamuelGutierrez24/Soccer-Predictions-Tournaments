
'use client';

import React from 'react';
import Matches from "./Matches";
import { Match, Team, Stage, Tournament, TournamentBet } from "@/src/interfaces/polla";

interface FinalMatchesProps {
  matches: Match[];
  teams: Team[];
  stages: Stage[];
  tournament: Tournament | null,
  pollaId: string | string[] | undefined;
  tournamentBet : TournamentBet | null;
}

export default function FinalMatches({
  matches,
  teams,
  stages,
  tournament,
  pollaId,
  tournamentBet
}: FinalMatchesProps) {
  
  const finalStages = stages.filter(s => {
    const name = s.stageName.toLowerCase();
    return name === "semi-finals" || name === "final";
  });
  const finalIds = new Set(finalStages.map(s => s.id));

  const finalMatches = matches.filter(m => finalIds.has(m.stageId));

  return <Matches matches={finalMatches} teams={teams} tournament={tournament} pollaId={pollaId} tournamentBet={tournamentBet} />;
}
