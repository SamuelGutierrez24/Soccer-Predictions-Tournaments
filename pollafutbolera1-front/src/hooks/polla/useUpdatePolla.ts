import { PollaApi } from "../../apis/polla.api";

export const updatePolla = async (id: string, pollaConfig: any) => {
    const api = new PollaApi(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    const updatedPolla = await api.updatePolla(id, JSON.parse(JSON.stringify(pollaConfig)));
    return updatedPolla;
}

export const getPollaForEdit = async (id: string) => {
    const api = new PollaApi(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    const polla = await api.getPollaById(id);
    return polla;
} 