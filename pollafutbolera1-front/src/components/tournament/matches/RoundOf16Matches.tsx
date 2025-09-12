'use client';

import StageMatches from "./StageMatches";
import { Match, Team, Stage, Tournament, TournamentBet } from "@/src/interfaces/polla";

interface RoundOf16MatchesProps {
  matches: Match[];
  teams: Team[];
  stages: Stage[];
  tournament: Tournament | null,
  pollaId: string | string[] | undefined;
  tournamentBet : TournamentBet | null;
}

export default function RoundOf16Matches(props: RoundOf16MatchesProps) {
  return <StageMatches {...props} keyword="round of 16" />;
}
