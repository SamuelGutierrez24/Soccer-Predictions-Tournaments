import { GroupTeam } from "@/src/interfaces/polla";
import { cn } from "@/src/lib/utils";

interface TeamItemProps {
  team: GroupTeam;
  position: number;
  isAdvancing: boolean;
  className?: string;
}

const TeamItem = ({ team, position, isAdvancing, className }: TeamItemProps) => {
  const hasZeroPoints = team.points === 0;
  const circleClasses = hasZeroPoints
    ? "bg-gray-300 text-gray-800"
    : isAdvancing
    ? position <= 2
      ? "bg-[#F2D642] text-gray-800"
      : "bg-tournament-runnerup text-gray-800"
    : "bg-gray-300 text-gray-800";

  return (
    <div
      className={cn(
        "flex w-full justify-between items-center p-2 rounded-md transition-colors bg-gray-100 hover:bg-gray-200",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full text-sm mr-2",
            circleClasses
          )}
        >
          {position}
        </span>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
          {team.teamLogoUrl ? (
            <img
              src={team.teamLogoUrl}
              alt={`${team.teamName} logo`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/32";
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-bold text-lg text-gray-800">
              {team.teamName.substring(0, 2)}
            </span>
          )}
        </div>

        <span className="font-medium">{team.teamName}</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="font-bold text-lg">{team.points}</span>
        <span className="text-xs text-gray-500">PTS</span>
      </div>
    </div>
  );
};

export default TeamItem;
