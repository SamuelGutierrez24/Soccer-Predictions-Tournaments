import { subPollaApi } from "../../apis/subpolla.api";

export const getPollaIdsByUserId = async (userId: number) => {
    return await subPollaApi.getPollaIdsByUserId(userId);
};

export const getSubPollasByPollaId = async (pollaId: number) => {
    return await subPollaApi.findByPollaId(pollaId);
};

export const createSubpollaJoinRequest = async (dto: { userId: number; subpollaId: number }) => {
    return await subPollaApi.createJoinRequest(dto);
};

export const getSubPollasByCreatorUserId = async (creatorUserId: number) => {
    return await subPollaApi.findByCreatorUserId(creatorUserId);
};

export const getJoinRequestsBySubpolla = async (subpollaId: number) => {
    return await subPollaApi.getJoinRequestsBySubpolla(subpollaId);
};

export const respondToJoinRequest = async (requestId: number, decision: "ACCEPT" | "REJECT") => {
    return await subPollaApi.respondToJoinRequest(requestId, decision);
};

export const createSubPolla = async (subPolla: any) => {
    return await subPollaApi.createSubPolla(subPolla);
}

export const getUsersOfSubPolla = async (subPollaId: number) => {
    return await subPollaApi.getUsersOfSubPolla(subPollaId);
}

export const removeUserFromSubPolla = async (subPollaId: number, userId: number) => {
    return await subPollaApi.removeUserFromSubPolla(subPollaId, userId);
}
