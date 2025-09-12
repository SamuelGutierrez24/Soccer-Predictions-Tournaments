
'use client';

import React from 'react';
import Matches from "./Matches";
import { Match, Team, Stage, Tournament, TournamentBet } from "@/src/interfaces/polla";

interface QuarterFinalMatchesProps {
  matches: Match[];
  teams: Team[];
  stages: Stage[];
  tournament: Tournament | null,
  pollaId: string | string[] | undefined;
  tournamentBet : TournamentBet | null;
}

export default function QuarterFinalMatches({
  matches,
  teams,
  stages,
  tournament,
  pollaId,
  tournamentBet
}: QuarterFinalMatchesProps) {
  
  const quarterStages = stages.filter(s => {
    const name = s.stageName.toLowerCase();
    return name === "quarter-finals" || name === "3rd place final";
  });
  const quarterIds = new Set(quarterStages.map(s => s.id));

  const quarterMatches = matches.filter(m => quarterIds.has(m.stageId));

  return <Matches matches={quarterMatches} teams={teams} tournament={tournament} pollaId={pollaId} tournamentBet={tournamentBet} />;
}
