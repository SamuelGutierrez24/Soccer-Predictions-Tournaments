"use client";
import { GroupTeam } from "@/src/interfaces/polla";

interface Props {
  first?: GroupTeam;
  second?: GroupTeam;
  groupName: string;
}

const cardBase = "rounded-lg overflow-hidden shadow-sm border border-[#313EB1] w-44 text-left bg-white";
const blueRow = "flex items-center justify-between px-3 py-[11px] text-sm bg-[#313EB1] text-white";
const placeholderRow = "flex items-center justify-between px-3 py-[11px] text-sm bg-[#E3E9F8] text-[#6D7281]";
const indicator = "h-3 w-3 rounded-full border-white bg-white/20";
const placeholderIndicator = "h-3 w-3 rounded-full border border-gray-300 bg-transparent";

const WinnerCard: React.FC<Props> = ({ first, second, groupName }) => (
  <div className={cardBase}>
    
    <div className={first ? blueRow : placeholderRow}>
      <span className="flex items-center gap-2">
        {first ? (
          <>
            <img
              src={first.teamLogoUrl}
              alt={first.teamName}
              className="h-4 w-4 object-cover rounded-sm"
            />
            {first.teamName}
          </>
        ) : (
          <>
            <div className="h-4 w-4 bg-gray-300 rounded-sm" />
            Por Definir
          </>
        )}
      </span>
      <span className={first ? indicator : placeholderIndicator} />
    </div>
    
    
    <div className={second ? blueRow : placeholderRow}>
      <span className="flex items-center gap-2">
        {second ? (
          <>
            <img
              src={second.teamLogoUrl}
              alt={second.teamName}
              className="h-4 w-4 object-cover rounded-sm"
            />
            {second.teamName}
          </>
        ) : (
          <>
            <div className="h-4 w-4 bg-gray-300 rounded-sm" />
            Por Definir
          </>
        )}
      </span>
      <span className={second ? indicator : placeholderIndicator} />
    </div>
    
    
    <div className="w-full text-[10px] uppercase tracking-wide py-1 bg-[#E3E9F8] text-[#313EB1] text-center">
      {groupName.toUpperCase()}
    </div>
  </div>
);

export default WinnerCard;