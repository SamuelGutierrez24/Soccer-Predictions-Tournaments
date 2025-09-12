import { authApi } from "@/src/apis";

export const useNickNameExists = () => {
    
  const alreadyExists = async (nickname: string) => {

    try {
      const res = await authApi.alreadyExists(nickname);
      return res;
    } catch (error: any) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            // Return server response error
            return { error: error.response.data?.message || error.response.data || "Error del servidor" };
          }
          return { error: "Ocurrió un error inesperado al conectar con el servidor" };
    }

  };

  return { alreadyExists };
  
};