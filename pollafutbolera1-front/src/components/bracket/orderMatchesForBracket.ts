import { Match } from "@/src/interfaces/polla";

const containsTeam = (m: Match, teamId: number | undefined) =>
  teamId === m.homeTeamId || teamId === m.awayTeamId;

export function orderMatchesForBracket(
  prevRound: Match[],
  nextRound: Match[]
): Match[] {
  const ordered: Match[] = [];
  const used = new Set<number>();

  nextRound.forEach(nxt => {
    const pair = prevRound.filter(
      p =>
        !used.has(p.id) &&
        (containsTeam(p, nxt.homeTeamId) || containsTeam(p, nxt.awayTeamId))
    );

    pair.forEach(p => {
      ordered.push(p);
      used.add(p.id);
    });
  });

  
  prevRound.forEach(p => {
    if (!used.has(p.id)) ordered.push(p);
  });

  return ordered;
}
