import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { Company } from '../interfaces/company.interface';

export class CompanyApi {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {

    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers:
       {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ...getAuthorizationHeader(),
        'X-TenantId': '777'
        },

    });
  }
  
  getCompanyById = async (companyId: number): Promise<{ id: number; name: string }> => {
      try {
        const response = await this.instance.get<{ id: number; name: string }>(`/company/id/${companyId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching company by id", error);
        throw error;
      }
  }

  getAllCompanies = async (): Promise<Company[]> => {
      try {
          const res = await this.instance.get('/company/companies',{ headers: getAuthorizationHeader() });
          return res.data;
      } catch (error) {
          throw error;
      }
  }

  createCompany = async (payload: {
    companyDTO: {
      name: string;
      nit: string;
      address?: string;
      contact?: string;
      logo: string;
    };
    companyAdminId: number;
  }): Promise<Company> => {
    try {
      const response = await this.instance.post("/company/save", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  getCompanyByName = async (name: string): Promise<Company | null> => {
    try {
      const response = await this.instance.get(`/company/name/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  updateCompany = async (id: number, companyData: Partial<Omit<Company, 'id'>>): Promise<Company> => {
      try {
          const response = await this.instance.patch(`/company/${id}`, companyData);
          return response.data;
      } catch (error) {
          throw error;
      }
  }

  deleteCompany = async (id: number): Promise<{ success: boolean }> => {
      try {
          await this.instance.delete(`/company/${id}`);
          return { success: true };
      } catch (error) {
          return { success: false };
      }
  }

}
