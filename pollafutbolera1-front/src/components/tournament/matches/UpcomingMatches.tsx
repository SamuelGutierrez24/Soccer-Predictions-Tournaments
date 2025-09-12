'use client';

import { filterByStatus } from "@/src/utils/match_filter";
import Matches from "./Matches";
import { Match, Team, Stage } from "@/src/interfaces/polla";
import PredictMatches from "./PredictMatches";

interface UpcomingMatchesProps {
  pollaId: string;
  matches: Match[];
  teams: Team[];
  stages: Stage[];
}

export default function UpcomingMatches({ matches, teams, pollaId }: UpcomingMatchesProps) {
  const upcoming = filterByStatus(matches, ["Not Started", "Match Scheduled"]);
  return <PredictMatches matches={upcoming} teams={teams} pollaId={pollaId}/>;
}
