import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { User } from "../interfaces/user.interface";
import { companyApi } from './index';

export class UserApi {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {

    const token = getAuthorizationHeader().Authorization;

    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      
    });
  }
  
  getUsersByDefaultCompany = async (): Promise<User[]> => {
    try {
      const defaultCompany = await companyApi.getCompanyByName("Popoya");
      const tenantId = defaultCompany?.id || 1;
      
      const res = await this.instance.get("/default-company", {
        headers: {
          'X-TenantId': tenantId.toString()
        }
      });
      
      // Mapear id a userId en cada usuario
      const mappedUsers = res.data.map((user: any) => ({
        ...user,
        userId: user.id
      }));
      
      return mappedUsers;
    } catch (error) {
      return [];
    }
  };

  getUsersByPollaId = async (pollaId: number): Promise<User[]> => {
    try {
        const res = await this.instance.get(`/polla/${pollaId}`,{
          headers: {
            'X-TenantId': '777'
          }
        });
        return res.data;
    } catch (error) {
        return [];
    }
  };


  banUserFromPolla = async (userId: number, pollaId: number) => {
    try {
        const res = await this.instance.put(`/polla/${pollaId}/ban/user/${userId}`, {}, {
          headers: {
            'X-TenantId': '777'
          }
        });
        return res.data;
    } catch (error) {
      console.log(error)
        return false;
    }
  };


}