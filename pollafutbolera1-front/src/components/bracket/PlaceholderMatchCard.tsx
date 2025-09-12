import React from 'react';

interface PlaceholderMatchCardProps {
  onClick?: () => void;
  isScheduled?: boolean; 
}

const PlaceholderMatchCard: React.FC<PlaceholderMatchCardProps> = ({ 
  onClick, 
  isScheduled = false 
}) => {
  const borderStyle = isScheduled ? "border-dashed" : "border-solid";
  
  return (
    <button
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-sm border-1 border-[#313EB1] ${borderStyle} w-44 text-left bg-white`}
    >
      <div className="flex items-center justify-between px-3 py-[11px] text-sm bg-[#E3E9F8] text-[#6D7281]">
        <span className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded-sm animate-pulse" />
          <span className="text-xs">{isScheduled ? "Pending" : "Por Definir"}</span>
        </span>
        <span className="h-3 w-3 rounded-full border border-gray-300 bg-transparent" />
      </div>
      <div className="flex items-center justify-between px-3 py-[11px] text-sm bg-[#E3E9F8] text-[#6D7281]">
        <span className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded-sm animate-pulse" />
          <span className="text-xs">{isScheduled ? "Pending" : "Por Definir"}</span>
        </span>
        <span className="h-3 w-3 rounded-full border border-gray-300 bg-transparent" />
      </div>
    </button>
  );
};

export default PlaceholderMatchCard;
