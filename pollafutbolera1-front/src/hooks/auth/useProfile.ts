import { LoginSchema } from "@/src/schemas";
import { authApi } from "@/src/apis";
export const useProfile = () => {
    
  const getMyProfile = async (token:string) => {
    try {
      const res = await authApi.getMyProfile(token);
      // remove +57 from phone number
      if (res.phoneNumber) {
        res.phoneNumber = res.phoneNumber.replace("+57", "");
      }
      return res;
    } catch (error: any) {
      if (error.response) {
        return { error: "Usuario no registrado, por favor registrate" };
      }
      return { error: "Ocurrio un error inesperado" };
    }

  };

  const updateProfile = async (token: string, userData: {
    name: string;
    lastName: string;
    mail: string;
    nickname: string;
    phoneNumber: string;
    photo: string;
  }) => {
    try {
      // add +57 to phone number
      if (userData.phoneNumber) {
        userData.phoneNumber = "+57" + userData.phoneNumber;
      }
      const res = await authApi.updateMyProfile(token, userData);
      return res;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: 'Network error' };
    }
  };

  return { getMyProfile, updateProfile };  
  
};