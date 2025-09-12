'use client';

import { filterByStageKeyword } from "@/src/utils/match_filter";
import Matches from "./Matches";
import { Match, Team, Stage, Tournament, TournamentBet } from "@/src/interfaces/polla";

interface StageMatchesProps {
  matches: Match[];
  teams: Team[];
  stages: Stage[];
  keyword: string; 
  tournament: Tournament | null;
  pollaId?: string | string[] | undefined;
  tournamentBet: TournamentBet | null;  
}

export default function StageMatches({
  matches,
  teams,
  stages,
  keyword,
  tournament,
  pollaId,
  tournamentBet
}: StageMatchesProps) {
  const filtered = filterByStageKeyword(matches, stages, keyword);
  return <Matches matches={filtered} teams={teams} tournament={tournament} pollaId={pollaId} tournamentBet={tournamentBet} />;
}
