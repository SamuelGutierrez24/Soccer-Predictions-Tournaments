export interface Match {
  id: number;
  date: string;                  
  status: string;
  homeTeamId: number;
  awayTeamId: number;
  winnerTeamId?: number | null;

  tournamentId: number;
  stageId: number;

  deletedAt?: string | null;

  homeScore: number;
  awayScore: number;

  extratime: boolean;
  extraHomeScore?: number | null;
  extraAwayScore?: number | null;

  penalty: boolean;
  penaltyHome?: number | null;
  penaltyAway?: number | null;
  
}