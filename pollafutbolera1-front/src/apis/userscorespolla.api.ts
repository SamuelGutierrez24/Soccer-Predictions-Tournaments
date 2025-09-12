import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class UserScoresPollaApi {
  protected readonly instance: AxiosInstance;

 public constructor(url: string) {
    const token = getAuthorizationHeader().Authorization;
    this.instance = axios.create({
        baseURL: url,
        timeout: 10000,
        timeoutErrorMessage: "Timeout exceeded",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `${token}`,
            "Content-Type": "application/json",
            'X-TenantId': 1,
        },
    });
  }

  // Returns only ids
  getPollaIdsByUserId = async (userId: number, token: string) => {
    try {
      const response = await this.instance.get(`/userscorespolla/user/${userId}/pollas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Returns DTOs
  getPollasByUserId = async (token: string) => {
    try {
      const response = await this.instance.get(`/userscorespolla/pollas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  createRelation = async (userId: number, pollaId: number) => {
    try {
      const response = await this.instance.post(
        `/userscorespolla/create/${userId}/${pollaId}`);
    }
    catch (error) {
      throw error;
    }
  };

  getPollaRanking = async (pollaId: string, token: string) => {
    try {
      const response = await this.instance.get(`/userscorespolla/polla/${pollaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUserPositionInPolla = async (pollaId: string, userId: number, token: string) => {
    try {
      const response = await this.instance.get(`/userscorespolla/position/polla/${pollaId}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
          
}