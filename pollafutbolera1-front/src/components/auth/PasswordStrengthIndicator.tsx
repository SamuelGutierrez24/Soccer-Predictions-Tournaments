import React from "react";
import { CustomProgress } from "./CustomProgress";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

export const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
  const value = (strength / 5) * 100;
  
  const getColorClass = () => {
    if (value <= 20) return "bg-destructive";
    if (value <= 40) return "bg-orange-500";
    if (value <= 60) return "bg-yellow-500";
    if (value <= 80) return "bg-lime-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full">
      <CustomProgress 
        value={value} 
        className="h-2 w-full"
        indicatorClassName={getColorClass()}
      />
    </div>
  );
};