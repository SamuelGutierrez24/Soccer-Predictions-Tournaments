import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { SubPolla } from "../interfaces/subpolla.interface";
import { User } from "../interfaces/user.interface";
import { UserSubPolla } from "../interfaces/user_subpolla.interface";

export class SubPollaApi {
  private axios: AxiosInstance;

  public constructor(baseUrl: string) {
    const token = getAuthorizationHeader().Authorization;
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      timeout: 10000,
    });
  }

  public async getPollaIdsByUserId(userId: number): Promise<number[]> {
    try {
      const response = await this.axios.get<number[]>(`/userscorespolla/user/${userId}/pollas`);
      return response.data;
    } catch (error) {
      console.error("Error fetching polla IDs by user ID", error);
      throw error;
    }
  }

  public async findByPollaId(pollaId: number): Promise<any[]> {
    try {
      const response = await this.axios.get<any[]>(`/sub-polla/polla/${pollaId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subpollas by pollaId", error);
      throw error;
    }
  }

  public async createJoinRequest(dto: { userId: number; subpollaId: number }): Promise<any> {
    try {
      const response = await this.axios.post("/join-request/request", dto);
      return response.data;
    } catch (error) {
      console.error("Error creating join request", error);
      throw error;
    }
  }

  public async findByCreatorUserId(creatorUserId: number): Promise<any[]> {
    try {
      const response = await this.axios.get<any[]>(`/sub-polla/creator/${creatorUserId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subpollas by creatorUserId", error);
      throw error;
    }
  }

  public async getJoinRequestsBySubpolla(subpollaId: number): Promise<any[]> {
    try {
      const response = await this.axios.get<any[]>(`/join-request/subpolla/${subpollaId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching join requests by subpollaId", error);
      throw error;
    }
  }

  public async respondToJoinRequest(requestId: number, decision: "ACCEPT" | "REJECT"): Promise<any> {
    try {
      const response = await this.axios.patch(
        `/join-request/${requestId}/response`,
        { decision }
      );
      return response.data;
    } catch (error) {
      console.error("Error responding to join request", error);
      throw error;
    }
  }

  public async createSubPolla(dto: SubPolla): Promise<any> {
    try {
      const response = await this.axios.post("/sub-polla/save", dto);
      return response.data;
    } catch (error) {
      console.error("Error creating subpolla", error);
      throw error;
    }
  }

  public async getUsersOfSubPolla(subpollaId: number): Promise<UserSubPolla[]> {
    try {
      const response = await this.axios.get<UserSubPolla[]>(`/sub-polla/${subpollaId}/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users of subpolla", error);
      throw error;
    }
  }

  public async removeUserFromSubPolla(subpollaId: number, userId: number): Promise<void> {
    try {
      await this.axios.delete(`/sub-polla/${subpollaId}/usuarios/${userId}`);
    } catch (error) {
      console.error("Error removing user from subpolla", error);
      throw error;
    }
  }

}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const subPollaApi = new SubPollaApi(API_BASE_URL);
