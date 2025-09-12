import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { getAuthorizationHeader } from '../../apis/getAuthorizationHeader';

export class RewardService {
  private axios: AxiosInstance;

  public constructor(baseUrl: string) {
    const token = getAuthorizationHeader().Authorization;
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-TenantId': '777',
        Authorization: `${token}`
      },
      timeout: 10000, // Set a timeout of 10 seconds
    });
  }

  private getAuthToken(): string | null {
    const currentUser = Cookies.get('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.token;
    }
    return null;
  }

  public async getRewardByPolla(pollaId: number) {
    try {
      const response = await this.axios.get(`/reward/polla/${pollaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rewards for polla with id ${pollaId}`, error);
      throw error;
    }
  }

  public async saveRewards(rewards: RewardSaveDTO[]) {
    try {
      await this.axios.post("/reward/save", rewards);
    } catch (error) {
      console.error('Error saving rewards', error);
      throw error;
    }
  }

  public async updateRewards(pollaId: number, rewards: RewardSaveDTO[]) {
    try {
      // First delete existing rewards for the polla
      await this.axios.delete(`/reward/polla/${pollaId}`);
      // Then save the new rewards
      await this.saveRewards(rewards);
    } catch (error) {
      console.error('Error updating rewards', error);
      throw error;
    }
  }
}

export interface RewardSaveDTO {
  name: string;
  description: string;
  image: string;
  position: number;
  pollaId: number;
}
