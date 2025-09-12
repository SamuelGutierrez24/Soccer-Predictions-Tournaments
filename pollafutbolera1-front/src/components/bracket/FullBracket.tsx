
"use client";
import React, { useMemo } from "react";
import { Stage, Group, Team, Match } from "@/src/interfaces/polla";
import { getGroupWinners } from "./getGroupWinners";
import WinnerCard from "./WinnerCard";
import RoundColumn from "./RoundColumn";
import {
  MatchOrPlaceholder,
  getRoundNames,          
} from "./mockMatches";


type Round = {
  title: string;
  matches: MatchOrPlaceholder[];
  stageId: number;
};

interface FullBracketProps {
  stages: Stage[];
  groups: Group[];
  teams: Team[];
  matches: Match[];
  onMatchClick?: (m: MatchOrPlaceholder) => void;
}


function generateGroupWinnerPlaceholders(groups: Group[]) {
  return groups
    .sort((a, b) => a.groupName.localeCompare(b.groupName))
    .map((group) => {
      const finished = groupIsCompleted(group);

      const [first, second] = finished
      ? getGroupWinners(group) 
      : [undefined, undefined];

      const basePlaceholder = (rank: number) => ({
        teamId: -1,
        teamName: "Por Definir",
        teamLogoUrl: "",
        rank,
        points: 0,
      });

      return {
        groupName: group.groupName,
        first: first ?? basePlaceholder(1),
        second: second ?? basePlaceholder(2)
      };
    });
}

function groupIsCompleted(group: Group): boolean {
  return (
    group.matches.length > 0 &&
    group.matches.every(m => m.status === "Match Finished")
  );
}


function generateBracketStructure(
  groupCount: number,
  stages: Stage[],
  matches: Match[]
): Round[] {
  
  let knockoutStages = stages
    .filter(
      (s) =>
        (s as any).type !== "GROUP" && 
        !s.stageName.toLowerCase().includes("group") &&
        !s.stageName.toLowerCase().includes("fase de grupos") &&
        !s.stageName.toLowerCase().includes("3rd place")
    )
    .sort((a, b) => a.id - b.id);

  
  if (knockoutStages.length === 0 && groupCount > 0) {
    const roundNames = getRoundNames(groupCount * 2); 
    knockoutStages = roundNames.map((name, idx) => ({
      id: -(idx + 1),        
      stageName: name,
      type: "KNOCKOUT",
      
      startDate: "", endDate: "",
    })) as unknown as Stage[];
  }

  if (knockoutStages.length === 0) return [];

  
  const teamsInKnockout = groupCount * 2;
  let currentRoundTeams = teamsInKnockout;

  const rounds: Round[] = [];

  knockoutStages.forEach((stage) => {
    const matchesInRound = Math.max(1, currentRoundTeams / 2);
    const realMatches = matches.filter((m) => m.stageId === stage.id);

    const roundMatches: MatchOrPlaceholder[] = [];

    for (let i = 0; i < matchesInRound; i++) {
      const realMatch = realMatches[i];

      if (realMatch && realMatch.homeTeamId && realMatch.awayTeamId) {
        roundMatches.push(realMatch);
      } else if (realMatch) {
        
        roundMatches.push({
          id: `scheduled-${stage.id}-${i}`,
          stageId: stage.id,
          status: "Placeholder",
          isPlaceholder: true,
          scheduledMatch: realMatch,
        });
      } else {
        
        roundMatches.push({
          id: `placeholder-${stage.id}-${i}`,
          stageId: stage.id,
          status: "Placeholder",
          isPlaceholder: true,
        });
      }
    }

    rounds.push({
      title: stage.stageName.toUpperCase(),
      matches: roundMatches,
      stageId: stage.id,
    });

    currentRoundTeams = matchesInRound;
  });

  return rounds;
}


const FullBracket: React.FC<FullBracketProps> = ({
  stages = [],
  groups = [],
  teams = [],
  matches = [],
  onMatchClick,
}) => {
  
  const groupCards = useMemo(() => generateGroupWinnerPlaceholders(groups), [
    groups,
  ]);

  
  const rounds = useMemo<Round[]>(() => {
    if (groups.length === 0) return [];
    return generateBracketStructure(groups.length, stages, matches);
  }, [groups.length, stages, matches]);

  
  if (groups.length === 0) {
    return (
      <section className="text-[#1F2937] p-8">
        <div className="text-center text-gray-500">
          No hay información del torneo disponible
        </div>
      </section>
    );
  }

  return (
    <section
      className="text-[#1F2937] p-8 overflow-x-auto"
      style={{ background: "radial-gradient(circle at right, #E3E9F8, #FFFFFF)" }}
    >
      <div className="flex gap-8 w-full">
        <div className="flex flex-col self-start">
          <h3 className="text-xs font-semibold text-[#6D7281] tracking-wider mb-16">
            GANADORES DE GRUPOS
          </h3>
          <div className="flex flex-col gap-6">
            {groupCards.map((c) => (
              <WinnerCard
                key={c.groupName}
                groupName={c.groupName}
                first={c.first.teamId !== -1 ? c.first : undefined}
                second={c.second.teamId !== -1 ? c.second : undefined}
              />
            ))}
          </div>
        </div>

  
        <div className="flex min-w-max">
          {rounds.map((r, i) => (
            <RoundColumn
              key={r.title}
              title={r.title}
              matches={r.matches}
              teams={teams}
              depth={i}
              isLast={i === rounds.length - 1}
              onMatchClick={onMatchClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullBracket;
