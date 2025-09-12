import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class AuthApi {
protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
        'X-TenantId': '0'
      },
      
    });
  }

  login = async(nickname:string, password:string) =>{

    try{
        const res = await this.instance
            .post('/user/authenticate',{
                nickname: nickname,
                password: password
            })
        return res.data
    }catch(error){
        throw error
    }
  }

  changePassword = async(id:string, password:string) =>{
    try{
      const res = await this.instance
        .post(`/auth/change/${id}`,{
          password
        })

      return res
    }catch(err){
      throw err
    }
  }

  getMyProfile = async(token: string) =>{
    try{
      let companyId;
      try {
        const currentUser = require('js-cookie').get('currentUser');
        if (currentUser) {
          companyId = JSON.parse(currentUser).company;
        }
      } catch (e) {
        companyId = undefined;
      }
      const res = await this.instance.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(companyId ? { 'X-TenantId': companyId } : {})
        },
      });
      return res.data;
    }catch(err){
      throw err;
    }
  }

  updateMyProfile = async(token: string, data: any) => {
    try {
      const res = await this.instance
        .put('/user/update',
          data, // Send the data in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      return res.data
    } catch(err) {
      throw err
    }
  }

  alreadyExists = async(nickname:string) =>{
    try{
      const res = await this.instance
        .get(`/user/nickname/exists/${nickname}`)
      return res.data
    }catch(err){
      throw err
    }
  }
  
  signUp = async(userData: {
    cedula: string;
    firstName: string;
    lastName: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
    imageUrl: string | null;
  }) => {
    try {

      const res = await this.instance.post('/user/create', {
        cedula: userData.cedula,
        name: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        mail: userData.email,
        nickname: userData.nickname,
        phoneNumber: userData.phone,
        photo: userData.imageUrl ? userData.imageUrl : null,
      });
      
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  getUserById = async (id: number) => {
    const token = getAuthorizationHeader().Authorization;
    const instance = axios.create({
      baseURL: this.instance.defaults.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || "",
      },
      timeout: 30000,
    });
    try {
      const res = await instance.get(`/user/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

}