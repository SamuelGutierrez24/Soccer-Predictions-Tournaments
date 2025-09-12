export interface PollaGetDTO {
    id: number;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    imageUrl: string;
    tournament: TournamentDTO;
}

export interface TournamentDTO {
    name: string;
}