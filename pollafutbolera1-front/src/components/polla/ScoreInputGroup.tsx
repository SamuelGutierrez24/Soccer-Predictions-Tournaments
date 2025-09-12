import React from 'react';
import ScoreInput from './ScoreInput';

interface ScoreInputGroupProps {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number | string;
  awayScore: number | string;
  onHomeScoreChange: (value: string) => void;
  onAwayScoreChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * ScoreInputGroup - A component combining two score inputs with a separator
 */
const ScoreInputGroup: React.FC<ScoreInputGroupProps> = ({
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  onHomeScoreChange,
  onAwayScoreChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <ScoreInput
        label={homeTeamName}
        value={homeScore}
        onChange={onHomeScoreChange}
        disabled={disabled}
      />
      <div className="text-2xl font-bold pt-6">-</div>
      <ScoreInput
        label={awayTeamName}
        value={awayScore}
        onChange={onAwayScoreChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ScoreInputGroup;