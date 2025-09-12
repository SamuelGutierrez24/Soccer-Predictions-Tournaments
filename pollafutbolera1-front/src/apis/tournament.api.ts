import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { Tournament } from "../interfaces/polla";
import { TournamentDTO } from "../interfaces/tournamentDTO.interface";

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

export class TournamentApi {
  private readonly instance: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseURL) {
      throw new Error("La variable de entorno NEXT_PUBLIC_API_BASE_URL no está definida.");
    }

    this.instance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Obtener el nombre del torneo por ID
  async getTournamentById(tournamentId: string): Promise<Tournament> {
    const headers = {
      ...getAuthorizationHeader(),
      ...getTenantHeader(),
    };

    const { data } = await this.instance.get<Tournament>(
      `/pollafutbolera/tournament/${tournamentId}`,
      { headers }
    );
    return data;
  }

  async getAllTournaments(): Promise<TournamentDTO[]> {
    try {
        const response = await this.instance.get("/tournaments");
        return response.data;
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        throw error;
    }
  }

  async registerTournament(leagueId: number, season: number): Promise<TournamentDTO> {
    try {
        const response = await this.instance.get(`/tournaments/register/${leagueId}/${season}`);
        return response.data;
    } catch (error) {
        console.error("Error registering tournament:", error);
        throw error;
    }
  }

}

export const tournamentApi = new TournamentApi();
