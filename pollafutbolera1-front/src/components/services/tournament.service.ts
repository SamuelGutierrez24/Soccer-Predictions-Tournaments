import axios, { AxiosInstance } from 'axios';
import { getAuthorizationHeader } from '../../apis/getAuthorizationHeader';
import { TournamentDTO } from '../../interfaces/tournamentDTO.interface';

export class TournamentService {
    private axios: AxiosInstance;

    public constructor(baseUrl: string) {
        const token = getAuthorizationHeader().Authorization;
        this.axios = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            timeout: 10000,
        });
    }

    public async getAllTournaments(): Promise<TournamentDTO[]> {
        try {
            const response = await this.axios.get("/tournaments");
            return response.data;
        } catch (error) {
            console.error('Error fetching tournaments', error);
            throw error;
        }
    }

}
