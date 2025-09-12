import { Match } from "./match.interface";

export interface Stage {
  id: number;
  stageName: string;
  tournamentId: number;
  deletedAt?: string | null;
}

export interface Round {
  title: string;
  matches: Match[];
}