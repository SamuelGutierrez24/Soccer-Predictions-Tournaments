import { Match, Stage } from "@/src/interfaces/polla";

export function filterByStatus(matches: Match[], statuses: string[]): Match[] {
  const set = new Set(statuses);
  return matches.filter(m => set.has(m.status));
}

export function filterByStageKeyword(
  matches: Match[],
  stages: Stage[],
  keyword: string
): Match[] {
  const stageIds = stages
    .filter(s => s.stageName.toLowerCase().includes(keyword.toLowerCase()))
    .map(s => s.id);
  const idSet = new Set(stageIds);
  return matches.filter(m => idSet.has(m.stageId));
}
