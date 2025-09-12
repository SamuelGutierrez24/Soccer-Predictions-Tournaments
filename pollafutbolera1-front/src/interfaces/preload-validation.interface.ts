import { InvalidUser } from "./invalid-preloaded-user.interface";
import { preloadedUser } from "./preload-user.interface";

export interface PreloadedUserResponse {
    validUsers: preloadedUser[];
    invalidUsers: InvalidUser[];
  }