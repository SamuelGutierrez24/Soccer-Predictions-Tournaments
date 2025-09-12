export interface TeamStats {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: {
    type: string;
    value: string | null;
  }[];
}