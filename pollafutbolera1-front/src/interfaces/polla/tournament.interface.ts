export interface Tournament {
  id: number;
  name: string;
  description: string;
  initial_date: string;                   
  final_date?: string | null;
  winnerTeamId?: number | null;
  fewestGoalsConcededTeamId?: number | null;
  topScoringTeamId?: number | null;
  deletedAt?: string | null;
}