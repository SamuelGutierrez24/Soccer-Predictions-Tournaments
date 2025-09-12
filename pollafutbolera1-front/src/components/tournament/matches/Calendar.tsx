"use client";

import { useMatchesByTournament } from "@/src/hooks/tournament/matches/useMatchesByTournament";
import { formatMatchDate } from "@/src/utils/match_format";
import MatchItem from "@/src/components/tournament/matches/MatchItem";
import { Match } from "@/src/interfaces/polla";

const Calendar = ({ tournamentId }: { tournamentId: string }) => {
  const { matches, tournament, loading, error } = useMatchesByTournament(tournamentId);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  const groupedMatches = matches.reduce((acc: any, match: Match) => {
    const date = formatMatchDate(match.date);
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedMatches).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="my-8">
      {sortedDates.map((date, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{date}</h3>
          {groupedMatches[date].map((match: Match, idx: number) => (
           {/* <MatchItem key={idx} homeTeam={match.homeTeamId} awayTeam={undefined} /> */}
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;