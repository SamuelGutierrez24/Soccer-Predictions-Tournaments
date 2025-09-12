import Cookies from "js-cookie";
import { LoginSchema } from "@/src/schemas";
import { authApi } from "@/src/apis";
export const useLogin = () => {
    
  const login = async (nickname: string, password: string) => {
    
    const validatedValues = LoginSchema.safeParse({ nickname: nickname, password: password });

    if (!validatedValues.success) {
      return {  error: validatedValues.error.errors[0].message }
    }
    
    try {
      const res = await authApi.login(nickname, password);
      Cookies.set("currentUser", JSON.stringify(res));
      
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return { error: "Usuario no registrado o contraseña incorrecta" };
      }
      return { error: "Ocurrio un error inesperado" };
    }

  };

  return { login };
  
};