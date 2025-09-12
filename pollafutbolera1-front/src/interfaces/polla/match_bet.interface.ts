import { Team } from "./team.interface";


interface Match {
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  status: string;
  homeScore: number;
  awayScore: number;
}


export interface MatchBet {
  id: number;
  homeScore: number;
  awayScore: number;
  earnedPoints: number;
  userId: number;
  pollaId: number;
  match: Match;
}