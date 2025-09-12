'use client';

import { FC } from "react";
import { Match, Team, GroupTeam } from "@/src/interfaces/polla";
import MatchItem from "./MatchItem";

interface MatchListProps {
  matches: Match[];
  teams: GroupTeam[];
}

const MatchList: FC<MatchListProps> = ({ matches, teams }) => {
  if (matches.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No matches scheduled
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {matches.map((match) => {
        const homeGroup = teams.find(
          (t) => String(t.teamId) === String(match.homeTeamId)
        );
        const awayGroup = teams.find(
          (t) => String(t.teamId) === String(match.awayTeamId)
        );

        const homeTeam: Team = {
          id: homeGroup?.teamId ?? match.homeTeamId,
          name: homeGroup?.teamName ?? "Unknown",
          logoUrl: homeGroup?.teamLogoUrl ?? "",
        };
        const awayTeam: Team = {
          id: awayGroup?.teamId ?? match.awayTeamId,
          name: awayGroup?.teamName ?? "Unknown",
          logoUrl: awayGroup?.teamLogoUrl ?? "",
        };

        return (
          <MatchItem
            key={match.id}
            match={match}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            showNames={false}
          />
        );
      })}
    </div>
  );
};

export default MatchList;
