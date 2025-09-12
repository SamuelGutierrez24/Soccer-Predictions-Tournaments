import axios, {AxiosInstance} from 'axios';
import { preloadedUser } from '@/src/interfaces/preload-user.interface';
import { getAuthorizationHeader } from './getAuthorizationHeader';

export class PreloadUserApi{

    protected readonly instance: AxiosInstance;
    protected readonly publicInstance: AxiosInstance;

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

        this.publicInstance = axios.create({
              baseURL: url,
              timeout: 30000,
              timeoutErrorMessage: "Time out!",
              headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json',
              },
              
            });
      }
      
    public async getPreLoadUsersByPollaId(id : number){
        try{
            const response = await this.instance.get(`user/preloaded/polla/${id}?page=0&size=10`);
            return response.data;
        }
        catch(error){
            console.error('Error with preloaded users', error);
            throw error;
        }
    }

    public async sendInvitationToPreloadUsers(preloadUsers : preloadedUser[]){
        try{
          const emailsToSend = preloadUsers.map(user => ({
            id: user.id,
            emailaddressee: user.mail,
            subject: "Invitación a unirse a nuestra plataforma",
            username: `${user.name} ${user.lastName}`,
            cedula: user.cedula
          }))
          
          return this.instance.post("email/sendToAll",
            emailsToSend);
        }
        catch(error){
            console.error('Error with send mail to users:', error);
            throw error;
        }
    }

    public async getPreloadUserById(idUser: string){
      try{
        const response = await this.publicInstance.get(`/user/preloadedusers/${idUser}`);
        console.log('Cedula:', idUser);
        console.log('Preloaded user:', response);
        const user = response.data;
    
        if (user) {
          return user;
        }
        else{
          return null;
        }
      } catch(error){
        console.error('Error with preloaded users', error);
        throw error;
      }
    }

    public async preloadUsers(file: File, pollaId: number, companyId: number) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await this.instance.post(`/user/preload/polla/${pollaId}`, formData, {
          headers: {
            "X-Company-Id": companyId.toString(),
            "X-TenantId": companyId.toString(),
            "Content-Type": "multipart/form-data",
            ...getAuthorizationHeader()
          },
        });
        
        return response.data;
      } catch (error) {
        console.error('Error uploading preload file:', error);
        throw error;
      }
    }
    
}