import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { Match } from "../interfaces/polla/match.interface";

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

export class MatchApi {
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

  // Obtener partidos por torneo
  async getMatchesByTournament(tournamentId: string): Promise<Match[]> {
    const headers = {
      ...getAuthorizationHeader(),
      ...getTenantHeader(),
    };

    const { data } = await this.instance.get<Match[]>(
      `/pollafutbolera/api/matches/tournament/${tournamentId}`,
      { headers }
    );
    return data;
  }
}

export const matchApi = new MatchApi();