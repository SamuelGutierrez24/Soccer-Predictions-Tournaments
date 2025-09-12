import axios, {AxiosInstance} from 'axios';
import { getAuthorizationHeader } from './getAuthorizationHeader';

export class UserScorePollaApi{

    protected readonly instance: AxiosInstance;
      public constructor(url: string) {
        this.instance = axios.create({
          baseURL: url,
          timeout: 30000,
          timeoutErrorMessage: "Time out!",
          headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            ...getAuthorizationHeader()
          },
          
        });
      }


      createRelatioUserPolla = async(userId:string, pollaId:string)=>{
        try{
            const response= await this.instance.post(`userscorespolla/create/${userId}/${pollaId}`);
            return response.data;
        }
        catch(error){
            console.error('Error with preloaded users', error);
            throw error;
        }

      }
}
