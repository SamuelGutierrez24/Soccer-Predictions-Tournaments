// Nueva interfaz que coincide con el DTO del backend
export interface TournamentDTO {
    id: number;
    name: string;
    description: string;
    initial_date: string;
    final_date: string;
    winner_team_id: number | null;
    fewest_goals_conceded_team_id: number | null;
    top_scoring_team_id: number | null;
    deleted_at: string | null;
}
