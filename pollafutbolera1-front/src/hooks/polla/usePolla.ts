import { userScoresPollaApi } from "@/src/apis";
import { PollaService } from "../../components/services/polla.service";
import { PollaApi } from "@/src/apis/polla.api";
import { Polla } from "@/src/interfaces/polla";


export const createPolla = async (pollaConfig: any) => {
    const service = new PollaService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    const polla = await service.createPolla(pollaConfig);
    return polla;
}

export const getPollas = async () => {
    const service = new PollaService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    
    const pollas: Polla[] = await service.getAllPollas();
    console.log(pollas)
    const pollasWithName = pollas.map((polla: any) => ({
        ...polla,
        name: `${polla.tournament.name} - ${polla.company.name}`,
    }));
    return pollasWithName;
}

export const getPollaById = async (id: string) => {
    const service = new PollaService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    return await service.getPollaById(id);
};

export const getPollasBycompany = async (companyId: number) => {
    const service = new PollaApi(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    return await service.getPollasByCompanyId(companyId);
}

export const useJoinPolla = async (pollaId: number, userId: number) => {
    
    return await userScoresPollaApi.createRelation(userId, pollaId);
}

export const getStatisticsByPollaId = async (pollaId: string) => {
    const service = new PollaService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
    const statistics = await service.getStatistics(pollaId);
    return statistics;
}