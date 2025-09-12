// Interfaz original para compatibilidad con código existente
export interface Tournament {
    id: string,
    name: string,
    description: string,
    winnerTeamId: string;
    fewestGoalsConcededTeamId: string;
    topScoringTeamId: string;
}