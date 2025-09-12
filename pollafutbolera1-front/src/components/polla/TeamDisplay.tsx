import React from 'react';
import Image from 'next/image';

interface TeamDisplayProps {
  team: {
    name: string;
    logoUrl?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

/**
 * TeamDisplay - A component to display a team logo and name
 */
export const TeamDisplay: React.FC<TeamDisplayProps> = ({ 
  team, 
  size = 'md' 
}) => {
  // Helper function to get valid image URLs
  const getValidImageUrl = (team: any): string => {
    // If it's already a valid URL or path, return it
    if (team.logoUrl && (team.logoUrl.startsWith('http') || team.logoUrl.startsWith('/'))) {
      return team.logoUrl;
    }
    
    // Fallback to a default image
    return "/pollas/default-flag.png"; 
  };

  // Size mappings
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <Image 
        src={getValidImageUrl(team)} 
        alt={team.name} 
        width={64} 
        height={64} 
        className={`${sizeClasses[size]} object-contain rounded-sm`}
      />
      <span className="font-medium">{team.name}</span>
    </div>
  );
};

export default TeamDisplay;