import axios, {AxiosInstance} from 'axios';
import Cookies from 'js-cookie';
import {getAuthorizationHeader} from "../../apis/getAuthorizationHeader";
import { Polla } from '@/src/interfaces/polla';

export class PollaService{

    private axios: AxiosInstance;

    public constructor(baseUrl: string) {

        const token = getAuthorizationHeader().Authorization;
        this.axios = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
                'X-TenantId': 1
            },
            timeout: 20000, // Set a timeout of 10 seconds
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

    public async getAllPollas(): Promise<Polla[]>{
        try {
            const response = await this.axios.get("/polla")
            return response.data;
        } catch (error) {
            console.error('Error fetching pollas', error);
            throw error;
        }
    }

    public async getPollaById(id: string) {
        try {
            const response = await this.axios.get(`/polla/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching polla with id ${id}`, error);
            throw error;
        }
    }

    
    public async createPolla(polla: any) {
        try {
            const response = await this.axios.post("/polla/save", polla);
            return response.data;
        } catch (error) {
            console.error('Error creating polla', error);
            throw error;
        }
    }

    public async getUserPollas(userId: string) {
        try {
            const response = await this.axios.get(`/polla/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching pollas for user ${userId}`, error);
            throw error;
        }
    }

    // Add method to make predictions
    public async makePrediction(pollaId: string, matchId: string, prediction: any) {
        try {
            const response = await this.axios.post(`/polla/${pollaId}/prediction/${matchId}`, prediction);
            return response.data;
        } catch (error) {
            console.error('Error making prediction', error);
            throw error;
        }
    }

    // Add method to get leaderboard
    public async getLeaderboard(pollaId: string) {
        try {
            const response = await this.axios.get(`/polla/${pollaId}/leaderboard`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching leaderboard for polla ${pollaId}`, error);
            throw error;
        }
    }

    public async getStatistics(pollaId: string){
        try {
            const response = await this.axios.get(`/polla/admin/${pollaId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching statistics for polla ${pollaId}`, error);
            throw error;
        }
    }
}