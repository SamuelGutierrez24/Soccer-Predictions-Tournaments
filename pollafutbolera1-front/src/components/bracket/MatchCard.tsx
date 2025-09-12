
"use client";
import React from 'react';
import PlaceholderMatchCard from './PlaceholderMatchCard';
import { MatchOrPlaceholder } from './mockMatches';
import { Team } from '@/src/interfaces/polla';

interface Props {
  match: MatchOrPlaceholder;
  teams: Team[];
  onClick?: (m: MatchOrPlaceholder) => void;
}

const MatchCard: React.FC<Props> = ({ match, teams, onClick }) => {
  
  if ('isPlaceholder' in match && match.isPlaceholder) {
    const isScheduled = 'scheduledMatch' in match && match.scheduledMatch;
    return (
      <PlaceholderMatchCard 
        onClick={() => onClick?.(match)} 
        isScheduled={!!isScheduled}
      />
    );
  }

  
  const realMatch = match as MatchOrPlaceholder & { 
    homeTeamId?: number; 
    awayTeamId?: number; 
    winnerTeamId?: number;
  };
  
 const home = teams.find(t => String(t.id) === String(realMatch.homeTeamId));
 const away = teams.find(t => String(t.id) === String(realMatch.awayTeamId));
  const isWinner = (id?: number) => id === realMatch.winnerTeamId;

  
  if (!home || !away) {
    return (
      <PlaceholderMatchCard 
        onClick={() => onClick?.(match)} 
        isScheduled={true}
      />
    );
  }

  return (
    <button
      onClick={() => onClick?.(match)}
      className="rounded-lg overflow-hidden shadow-sm border border-[#313EB1] w-44 text-left bg-white hover:shadow-md transition-shadow"
    >
      {[home, away].map(t => (
        <div
          key={t?.id}
          className={`flex items-center justify-between px-3 py-[11px] text-sm ${
            isWinner(t?.id)
              ? "bg-[#313EB1] text-white"
              : "bg-[#E3E9F8] text-[#1F2937]"
          }`}
        >
          <span className="flex items-center gap-2">
            <img
              src={t?.logoUrl}
              alt={t?.name}
              className="h-4 w-4 object-cover rounded-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-team-logo.png';
              }}
            />
            <span className="truncate max-w-[120px]">{t?.name}</span>
          </span>
          <span
            className={`h-3 w-3 rounded-full border ${
              isWinner(t?.id)
                ? "border-[#313EB1] bg-[#F2D642]"
                : "border-[#E3E9F8] bg-transparent"
            }`}
          />
        </div>
      ))}
    </button>
  );
};

export default MatchCard;