import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { Team } from "../interfaces/polla";

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

export class TeamsApi {
  private readonly instance: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseURL) {
      throw new Error("La variable de entorno NEXT_PUBLIC_API_BASE_URL no está definida.");
    }

    this.instance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Obtener detalles de un equipo por ID
  async getTeamById(teamId: string): Promise<Team> {
    const headers = {
      ...getAuthorizationHeader(),
      ...getTenantHeader(),
    };

    const { data } = await this.instance.get<Team>(
        `/pollafutbolera/api/teams/${teamId}`, 
        { headers }
    );
    return data;
  }
}

export const teamsApi = new TeamsApi();