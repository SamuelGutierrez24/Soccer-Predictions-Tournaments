import { authApi } from "@/src/apis";
import { SignUpSchema } from "@/src/schemas";

export const useSignUp = () => {
  const signUp = async (
    userData: {
      cedula: string;
      firstName: string;
      lastName: string;
      nickname: string;
      password: string;
      confirmPassword: string;
      email: string;
      phone: string;
      imageUrl: string | null;
    }
  ) => {
    const { cedula, firstName, lastName, nickname, password, confirmPassword, email, phone, imageUrl } = userData;
    const validatedValues = SignUpSchema.safeParse({ cedula, firstName, lastName, nickname, password, confirmPassword, email, phone });

    if (!validatedValues.success) {
      // Return only messages, not field name, ignore confirmPassword and join them
      const errorMessages = validatedValues.error.errors
        .filter((error) => error.path[0] !== "confirmPassword")
        .map((error) => error.message)
        .join("\n");
      
      return { error: `Error de validación: ${errorMessages}` };
    }
    
    try {
      const res = await authApi.signUp(
        {
          cedula,
          firstName,
          lastName,
          nickname,
          password,
          confirmPassword,
          email,
          phone: "+57" + phone,
          imageUrl
        }
      );
      return res;
    } catch (error: any) {
      if (error.response) {
        // Return server response error
        return { error: error.response.data?.message || error.response.data || "Error del servidor" };
      }
      return { error: "Ocurrió un error inesperado al conectar con el servidor" };
    }
  };

  return { signUp };
};