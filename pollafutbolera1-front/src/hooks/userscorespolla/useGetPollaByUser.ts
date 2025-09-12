import { userScoresPollaApi } from "@/src/apis";

export const getPollasByUser = async (token: string) => {
    const res = await userScoresPollaApi.getPollasByUserId(token);
    return res;
}

export const useGetPollaByUser = () => {
    return { getPollasByUser };
}