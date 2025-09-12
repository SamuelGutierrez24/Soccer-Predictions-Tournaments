import { Group, GroupTeam } from "@/src/interfaces/polla";

export function getGroupWinners(
  group: Group
): [GroupTeam | undefined, GroupTeam | undefined] {
  const ordered = [...group.teams].sort((a, b) => a.rank - b.rank);
  return [
    ordered.find(t => t.rank === 1),
    ordered.find(t => t.rank === 2),
  ];
}
