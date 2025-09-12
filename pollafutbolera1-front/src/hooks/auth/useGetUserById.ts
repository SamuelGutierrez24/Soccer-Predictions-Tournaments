import { authApi } from "@/src/apis";

export const useGetUserById = async (id: number) => {
  return await authApi.getUserById(id);
};
