import React from 'react';
import { Input } from '@/src/components/ui/input';

interface ScoreInputProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * ScoreInput - A component for inputting match scores
 */
const ScoreInput: React.FC<ScoreInputProps> = ({
  label,
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={`score-${label}`} className="mb-1 text-sm font-medium">
        {label}
      </label>
      <Input
        id={`score-${label}`}
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 p-2 border border-gray-300 rounded text-center text-lg font-bold"
        placeholder="0"
        disabled={disabled}
      />
    </div>
  );
};

export default ScoreInput;