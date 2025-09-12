import { Polla } from "./polla";
import { User } from "./user.interface";

export interface UserScore {
    polla: Polla;
    user: User;
    scores: number;
    state: string;
}