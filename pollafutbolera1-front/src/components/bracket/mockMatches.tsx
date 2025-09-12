
import { Match, Stage } from '@/src/interfaces/polla';

export interface PlaceholderMatch {
  id: string;
  homeTeamId?: number;
  awayTeamId?: number;
  stageId: number;
  status: 'Placeholder';
  isPlaceholder: true;
  scheduledMatch?: Match; 
}

export type MatchOrPlaceholder = Match | PlaceholderMatch;


export function getRoundNames(totalTeams: number): string[] {
  const rounds = [];
  let teams = totalTeams;
  
  while (teams > 1) {
    if (teams === 2) {
      rounds.push('FINAL');
    } else if (teams === 4) {
      rounds.push('SEMI FINAL');
    } else if (teams === 8) {
      rounds.push('CUARTOS');
    } else if (teams === 16) {
      rounds.push('OCTAVOS');
    } else if (teams === 32) {
      rounds.push('ROUND OF 32');
    } else {
      rounds.push(`ROUND OF ${teams}`);
    }
    teams = teams / 2;
  }
  
  return rounds;
}


export function shouldShowAsPlaceholder(match: Match): boolean {
  return (
    !match.homeTeamId || 
    !match.awayTeamId || 
    match.status === 'Not Started' ||
    match.status === 'Scheduled' ||
    match.status === 'Pending'
  );
}


export function generateMockMatches(groupCount: number, stages: Stage[]): MatchOrPlaceholder[] {
  const knockoutStages = stages
    .filter(
      s =>
        
        (s as any).type !== "GROUP" &&
        !s.stageName.toLowerCase().includes("group") &&
        !s.stageName.toLowerCase().includes("fase de grupos") &&
        !s.stageName.toLowerCase().includes("3rd place")
    )
    .sort((a, b) => a.id - b.id);

  const mockMatches: MatchOrPlaceholder[] = [];
  const teamsInKnockout = groupCount * 2;
  let currentTeamCount = teamsInKnockout;

  knockoutStages.forEach(stage => {
    const matchesInStage = Math.max(1, currentTeamCount / 2);

    for (let i = 0; i < matchesInStage; i++) {
      const placeholder: PlaceholderMatch = {
        id: `mock-${stage.id}-${i}`,
        stageId: stage.id,
        status: 'Placeholder',
        isPlaceholder: true,
      };
      mockMatches.push(placeholder);
    }

    currentTeamCount = matchesInStage;
  });

  return mockMatches;
}