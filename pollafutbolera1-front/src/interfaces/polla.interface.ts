import { PlatformConfig } from "./platform_confing.interface";
import { Tournament } from "./tournament.interface";

export interface Polla {
    id: number;
    name: string;
    endDate: Date;
    startDate: Date;
    imageUrl: string;
    isPrivate: boolean;
    platformConfig: PlatformConfig;
    tournament: Tournament;
}