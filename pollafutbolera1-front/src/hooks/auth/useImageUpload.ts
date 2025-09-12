import { imageApi } from "@/src/apis";

export const useImageUpload = () => {
  const imageUpload = async (image: File) => {
    try {
      const res = await imageApi.uploadImage(image);
      
      // Check if response contains an error
      if (res.data && typeof res.data === 'object' && 'error' in res.data) {
        throw new Error(res.data.error || "Error al subir la imagen");
      }
      
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Error al subir la imagen");
    }
  };

  const getPublicId = async (url: string, jwt: string) => {
    try {
      const res = await imageApi.extractPublicId(url, jwt);
      
      // Check if response contains an error
      if (res.data && typeof res.data === 'object' && 'error' in res.data) {
        throw new Error(res.data.error || "Error al extraer el public ID");
      }
      
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Error al extraer el public ID");
    }
  }

  const imageDelete = async (publicId: string, jwt: string) => {
    try {
      const res = await imageApi.deleteImage(publicId, jwt);
      
      // Check if response contains an error
      if (res.data && typeof res.data === 'object' && 'error' in res.data) {
        throw new Error(res.data.error || "Error al eliminar la imagen");
      }
      
      return res;
    }
    catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Error al eliminar la imagen");
    }
  };

  return { imageUpload, getPublicId ,imageDelete };
};