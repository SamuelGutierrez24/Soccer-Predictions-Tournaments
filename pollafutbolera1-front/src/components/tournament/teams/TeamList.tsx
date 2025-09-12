import { GroupTeam } from "@/src/interfaces/polla";
import TeamItem from "./TeamItem";

interface TeamListProps {
  teams: GroupTeam[];
  advancingCount?: number;
}

const TeamList = ({ teams, advancingCount = 2 }: TeamListProps) => {
  return (
    <div className="space-y-1">
      {teams.map((team, index) => (
        <TeamItem
          key={`${team.teamId}-${index}`}
          team={team}
          position={index + 1}
          isAdvancing={index < advancingCount}
        />
      ))}
    </div>
  );
};

export default TeamList;
