import { Team } from "../interfaces/polla";

export function transformStatus(rawStatus: string): 'scheduled' | 'in_progress' | 'finished' | 'cancelled' {
  if (rawStatus === "Match Finished") return 'finished';
  if (rawStatus === "Match In Progress") return 'in_progress';
  return 'scheduled';
}
