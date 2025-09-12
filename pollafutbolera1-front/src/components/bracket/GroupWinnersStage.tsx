"use client";

import React from "react";
import { Group, GroupTeam } from "@/src/interfaces/polla";

interface Props {
  groups: Group[];        
  
}

const GroupWinnersStage: React.FC<Props> = ({ groups }) => {

  const qualifiers = groups
    .sort((a, b) => a.groupName.localeCompare(b.groupName)) 
    .flatMap((g) => {
      
      const sortedTeams = [...g.teams].sort((t1, t2) => t1.rank - t2.rank);

      
      const first = sortedTeams[0] ?? null;   
      const second = sortedTeams[1] ?? null;  

      return [
        { label: `${g.groupName.replace("Group ", "")}1`, team: first },
        { label: `${g.groupName.replace("Group ", "")}2`, team: second },
      ];
    });

  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold text-gray-200 mb-4">
        CLASIFICADOS DE FASE DE GRUPOS
      </h2>

      <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {qualifiers.map(({ label, team }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#0f1d63] border border-indigo-700"
          >

            {team ? (
              <>
                <img
                  src={team.teamLogoUrl}
                  alt={team.teamName}
                  className="h-6 w-6 rounded-sm object-cover"
                />
                <span className="text-xs text-gray-100">
                  {label} - {team.teamName}
                </span>
              </>
            ) : (
              <span className="text-xs text-gray-400 italic">
                {label} - Pendiente
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GroupWinnersStage;
