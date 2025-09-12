import { useState, useEffect } from "react";
import { matchApi } from "@/src/apis/match.api";
import { teamsApi } from "@/src/apis/teams.api";
import { tournamentApi } from "@/src/apis/tournament.api";
import { Match, Team } from "@/src/interfaces/polla";

export const useMatchesByTournament = (tournamentId: string) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tournamentId) return;

    const fetchMatchesWithTeamsAndTournament = async () => {
      try {
        setLoading(true);

        const matchesData = await matchApi.getMatchesByTournament(tournamentId);

        const tournamentData = await tournamentApi.getTournamentById(tournamentId);
        setTournament(tournamentData);

        const detailedMatches = await Promise.all(
          matchesData.map(async (match) => {
            const homeTeam: Team = await teamsApi.getTeamById(String(match.homeTeamId));
            const awayTeam: Team = await teamsApi.getTeamById(String(match.awayTeamId));

            return {
              ...match,
              homeTeam,
              awayTeam,
            };
          })
        );

        setMatches(detailedMatches);
      } catch (err) {
        setError("Error fetching matches, teams, and tournament: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesWithTeamsAndTournament();
  }, [tournamentId]);

  return { matches, tournament, loading, error};
};