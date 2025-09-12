// stageUtils.ts
import { Stage, Match } from "@/src/interfaces/polla";

/* Devuelve TRUE sólo si todos los partidos de tipo GROUP han terminado */
export function areGroupMatchesFinished(stages: Stage[], matches: Match[]): boolean {
  // 1) Identificamos las etapas de grupos
  const groupStageIds = stages
    .filter(
      s =>
        (s as any).type === "GROUP" ||               // si tu DTO trae type
        s.stageName.toLowerCase().includes("group") || // inglés
        s.stageName.toLowerCase().includes("fase de grupos") // español
    )
    .map(s => s.id);

  // 2) Filtramos sus partidos
  const groupMatches = matches.filter(m => groupStageIds.includes(m.stageId));

  // 3) Si aún no llega ningún partido ⇒ NO ha terminado
  if (groupMatches.length === 0) return false;

  return groupMatches.every(m => m.status === "Match Finished");
}
