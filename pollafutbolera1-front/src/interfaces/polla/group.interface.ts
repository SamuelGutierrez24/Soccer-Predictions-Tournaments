import { Match } from "./match.interface";

export interface GroupTeam {
  teamId: number;
  teamName: string;
  teamLogoUrl: string;
  points:number;
  rank:number;
}

export interface Group {
  id: string;
  groupName: string;
  teams: GroupTeam[];
  matches: Match[];
}

export interface GroupsStage {
  id: string;
  name: string;
  groups: Group[];
}

export interface GroupTeam {
  teamId: number;
  teamName: string;
  teamLogoUrl: string;
  points:number;
  rank:number;
}