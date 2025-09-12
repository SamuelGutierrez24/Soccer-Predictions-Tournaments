import { userScorePollaApi } from "@/src/apis";

export const useRelationScorePolla = () =>{
    const createRelation = async (userId:string,pollaId:string)=>{

        try{
            const res = await userScorePollaApi.createRelatioUserPolla(userId,pollaId);
        }
        catch (error: any){
            if (error.response) {
                // Return server response error
                return { error: error.response.data?.message || error.response.data || "Error del servidor" };
            }
            return { error: "Ocurrió un error inesperado al conectar con el servidor" };
        }

    };

    return {createRelation};
};