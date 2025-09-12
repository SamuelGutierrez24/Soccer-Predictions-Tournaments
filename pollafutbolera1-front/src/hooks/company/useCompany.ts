import { companyApi } from "@/src/apis";

export const getAllCompanies = async () => {
  try {
    const res = await companyApi.getAllCompanies();
    return res;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Error al obtener las compañias");
  }
}
export const getCompanyById = async (companyId: number) => {
  return await companyApi.getCompanyById(companyId);
};
