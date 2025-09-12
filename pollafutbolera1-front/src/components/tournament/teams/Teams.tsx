'use client';

import React from 'react';
import { Team } from '@/src/interfaces/polla';

interface TeamsProps {
  teams: Team[];
}

export default function Teams({ teams }: TeamsProps) {
  if (!teams.length) {
    return (
      <div className="text-gray-500 text-center py-4">
        No teams available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex flex-col items-center bg-white rounded shadow-sm hover:shadow-md transition p-4"
        >
          <img
            src={team.logoUrl}
            alt={team.name}
            className="w-16 h-16 object-contain mb-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
            }}
          />
          <span className="text-sm font-medium text-center truncate">
            {team.name}
          </span>
        </div>
      ))}
    </div>
  );
}
