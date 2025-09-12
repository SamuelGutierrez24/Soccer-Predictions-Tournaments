export interface TournamentBet {
  id: number;
  earnedPoints?: number | null;
  userId: number;
  tournamentId: number;
  pollaId: number;
  winnerTeamId: number;
  fewestGoalsConcededTeamId: number;
  topScoringTeamId: number;
}