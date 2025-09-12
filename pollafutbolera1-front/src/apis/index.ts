import { AuthApi } from "./auth.api";
import { PollaApi } from "./polla.api";
import { ImageApi } from "./image.api";
import { UserApi } from "./user.api";
import { CompanyApi } from "./company.api";
import { UserScorePollaApi } from "./userScorePolla.api";
import { PreloadUserApi } from "./preloadUser.api";
import { PollaDetailsApi } from "./pollaDetails.api";
import { UserScoresPollaApi } from "./userscorespolla.api";
import { TournamentApi } from "./tournament.api";

export const userApi = new UserApi(process.env.NEXT_PUBLIC_API_BASE_URL + "/user" || 'http://localhost:8000/pollafutbolera/')
export const pollaService = new PollaApi(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/pollafutbolera/");
export const authApi = new AuthApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
export const imageApi = new ImageApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
export const companyApi = new CompanyApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
export const userScorePollaApi = new UserScorePollaApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
export const userScoresPollaApi = new UserScoresPollaApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
export const preloadUserApi = new PreloadUserApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/");
export const pollaDetailsApi = new PollaDetailsApi(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/")
