import { TournamentService } from "../../components/services/tournament.service";
import { TournamentDTO } from "../../interfaces/tournamentDTO.interface";

export const getAllTournaments = async (): Promise<TournamentDTO[]> => {
    const service = new TournamentService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    const tournaments = await service.getAllTournaments();
    return tournaments;
};