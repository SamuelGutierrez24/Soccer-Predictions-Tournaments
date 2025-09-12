'use client';

import { filterByStatus } from "@/src/utils/match_filter";
import Matches from "./Matches";
import { Match, Team, Stage, Tournament, TournamentBet } from "@/src/interfaces/polla";

interface CompletedMatchesProps {
  matches: Match[];
  teams: Team[];
  stages: Stage[];
  tournament: Tournament | null,
  pollaId: string | string[] | undefined;
  tournamentBet : TournamentBet | null;

}

export default function CompletedMatches({ matches, teams, tournament, pollaId, tournamentBet }: CompletedMatchesProps) {
  const completed = filterByStatus(matches, ["Match Finished", "Full Time"]);
  return <Matches matches={completed} teams={teams} tournament={tournament} pollaId={pollaId} tournamentBet={tournamentBet} />;
}
