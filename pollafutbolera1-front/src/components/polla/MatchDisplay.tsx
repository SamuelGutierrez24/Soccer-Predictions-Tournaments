import React from 'react';
import TeamDisplay from './TeamDisplay';

interface MatchDisplayProps {
  match: {
    homeTeam: {
      name: string;
      logoUrl?: string;
    };
    awayTeam: {
      name: string;
      logoUrl?: string;
    };
    date: string;
  };
}

/**
 * MatchDisplay - A component to display match details with both teams
 */
const MatchDisplay: React.FC<MatchDisplayProps> = ({ match }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600">
          {new Date(match.date).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} - {new Date(match.date).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
      
      <div className="flex items-center justify-around text-center">
        <TeamDisplay team={match.homeTeam} />
        <div className="text-2xl font-bold">VS</div>
        <TeamDisplay team={match.awayTeam} />
      </div>
    </div>
  );
};

export default MatchDisplay;