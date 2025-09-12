import axios, { AxiosInstance } from 'axios';

export class RulesService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'X-TenantId': '777',
            },
            timeout: 10000,
            timeoutErrorMessage: 'Request timed out',
        });
    }

    public async getRules(token: string, tournamentId: string) {
        const response = await this.axios.get(`/platformconfig/${tournamentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    }
}