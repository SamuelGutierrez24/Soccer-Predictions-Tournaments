import { Company } from "../company.interface";
import { PlatformConfig } from "../platform_confing.interface";
import { Reward } from "../reward.interface";
import { Tournament } from "./tournament.interface";

export interface Polla {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    imageUrl: string;
    isPrivate: boolean;
    rewards: Reward[];
    platformConfig: PlatformConfig;
    tournament: Tournament;
    company: Company
}