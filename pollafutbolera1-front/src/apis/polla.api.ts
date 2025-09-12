import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import Cookies from "js-cookie";

function getTenantHeader(): Record<string, string> {
    const raw = Cookies.get("currentUser");
    if (!raw) return {};
    try {
        const { tenantId } = JSON.parse(raw);
        return tenantId != null ? { "X-TenantId": String(tenantId) } : {};
    } catch {
        console.warn("currentUser cookie no es JSON válido");
        return {};
    }
}

function getUserId(): string | null {
    const raw = Cookies.get("currentUser");
    if (!raw) return null;
    try {
        const { userId } = JSON.parse(raw);
        return userId != null ? String(userId) : null;
    } catch {
        console.warn("currentUser cookie no es JSON válido");
        return null;
    }
}

export class PollaApi {

    protected readonly instance: AxiosInstance;

    public constructor(url: string) {
        const token = getAuthorizationHeader().Authorization;
        this.instance = axios.create({
            baseURL: url,
            timeout: 10000,
            timeoutErrorMessage: "Timeout exceeded",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                'X-TenantId': 1,

            },
        });
    }

    private get headers() {
        return {
            ...getAuthorizationHeader(),
            ...getTenantHeader(),
        };
    }

    private requireUserId(): string {
        const id = getUserId();
        if (!id) throw new Error("No se encontró userId en la cookie");
        return id;
    }


    public async getMatchBetsByUserIdAndPollaId(pollaId: string) {
        const userId = this.requireUserId();
        return this.instance.get(`matchbets/user/${userId}/polla/${pollaId}`,
            {
                headers: this.headers,
            }
        );
    }

    public async postTournamentBet(tournamentId:number, pollaId: number, winnerTeamId: number, topScoringTeamId: number) {
        const userId = this.requireUserId();
        if (winnerTeamId < 0 || topScoringTeamId < 0) {
            throw new Error("Los IDs de los equipos no pueden ser negativos");
        }
        return this.instance.post("tournamentbets", {
            earnedPoints: 0,
            userId,
            tournamentId,
            pollaId,
            winnerTeamId,
            topScoringTeamId,
            
        },
            {
                headers: this.headers,
            });
    }

    public async updateTournamentBet(tournamentBetId: number, winnerTeamId: number, topScoringTeamId: number) {
        const userId = this.requireUserId();
        if (winnerTeamId < 0 || topScoringTeamId < 0) {
            throw new Error("Los IDs de los equipos no pueden ser negativos");
        }
        return this.instance.put(`tournamentbets/${tournamentBetId}`, {
            winnerTeamId,
            topScoringTeamId,
        },
        {
                headers: this.headers,
    });
    }

    public async postMatchBet(homeScore: number, awayScore: number, matchId: string, pollaId: string) {

        const userId = this.requireUserId();
        if (homeScore < 0 || awayScore < 0) {
            throw new Error("Los puntajes no pueden ser negativos");
        }
        // Validate inputs
        return this.instance.post("matchbets", {
            homeScore,
            awayScore,
            matchId,
            userId,
            pollaId,
        },
            {
                headers: this.headers,
            });
    }

    //Check this endpoint
    public async updateMatchBet(matchBetId: string, homeScore: number, awayScore: number) {
        if (homeScore < 0 || awayScore < 0) {
            throw new Error("Los puntajes no pueden ser negativos");
        }
        return this.instance.put(`matchbets/${matchBetId}`, {
            homeScore,
            awayScore,
        }, {
            headers: this.headers,
        });
    }

    //Check this endpoint
    public async deleteMatchBet(matchBetId: string, token: string) {
        return this.instance.delete(`matchbets/${matchBetId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    finishPolla = async(id:number) =>{
        try{
            const res = await this.instance
                .delete(`/polla/${id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            return res.data
        }catch(error){
            throw error
        }
    }

    
    getPollaById = async(id:string) =>{
        try{
            const res = await this.instance
                .get(`/polla/${id}`,{
                     headers: this.headers,
                })
            return res.data
        } catch (error) {
            throw error
        }
    }

    updatePolla = async (id: string, data: JSON) => {
        try {
            const res = await this.instance
                .put(`/polla/${id}`, data, {
                    headers: this.headers
                })
            return res.data
        }catch(error){
            throw error
        }
    }

    getPollasByCompanyId = async(id: number) =>{
        try{
            const res = await this.instance
                .get(`/polla/company/${id}`,{
                         headers: this.headers,
                    }
                )
            return res.data
        }catch(error){
            throw error
        }
    }

    getMatchBetById(idPrediccion: string) {
        const userId = this.requireUserId();
        const response = this.instance.get(`matchbets/${idPrediccion}/user/${userId}`, {
            headers: this.headers,
        });
        return response.then((r) => r.data);
    }

}