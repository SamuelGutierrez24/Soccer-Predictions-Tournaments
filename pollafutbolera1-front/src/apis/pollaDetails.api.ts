// src/apis/pollaDetails.api.ts
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import {
  Polla, MatchBet, TournamentBet, Stage, Group, Tournament
} from '@/src/interfaces/polla/index';
import { Match } from "../interfaces/polla/match.interface";
import { Team } from "../interfaces/polla/team.interface";

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

export class PollaDetailsApi {

  protected readonly instance: AxiosInstance;

  constructor(url: string) {
    const baseURL = url;
    if (!baseURL) throw new Error("NEXT_PUBLIC_API_BASE_URL no está definida");

    this.instance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: { "Content-Type": "application/json" },
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

  getPolla(pollaId: string) {
    return this.instance
      .get<Polla>(`/polla/${pollaId}`, { headers: this.headers })
      .then((r:any) => r.data);
  }

  // Ahora no requiere userId como parámetro:
  getMatchBets(pollaId: string) {
    const userId = this.requireUserId();
    return this.instance
      .get<MatchBet[]>(`/matchbets/user/${userId}/polla/${pollaId}`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }

  getTournamentBets(pollaId: string) {
  try {
    const userId = this.requireUserId();
    const header = this.headers;
    return this.instance
      .get<TournamentBet>(`/tournamentbets/user/${userId}/polla/${pollaId}`, {
        headers: header,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error("Error en getTournamentBets:", error);
    return Promise.reject(error);
  }
}

  getCurrentStageName(tournamentId: string) {
    return this.instance
      .get<string>(`/stages/tournament/${tournamentId}/current`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }

  getStagesByTournament(tournamentId: string) {
    return this.instance
      .get<Stage[]>(`/stages/tournament/${tournamentId}`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }

  getGroupsByPolla(pollaId: string) {
    return this.instance
      .get<Group[]>(`/api/groups/by-polla/${pollaId}`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }

  fetchTeams(tournament: string | number) {
    return this.instance
      .get<Team[]>(`/api/teams/tournament`, {
        headers: this.headers,
        params: { tournament },
      })
      .then((r) => r.data);
  }

  getMatchesByTournament(tournamentId: string | number) {
    return this.instance
      .get<Match[]>(`/api/matches/tournament/${tournamentId}`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }

  getTournamentByIdPlural(tournamentId: string | number) {
    return this.instance
      .get<Tournament>(`/tournaments/${tournamentId}`, {
        headers: this.headers,
      })
      .then((r) => r.data);
  }
}