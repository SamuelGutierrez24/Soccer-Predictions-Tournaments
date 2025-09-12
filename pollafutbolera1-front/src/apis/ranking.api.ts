import axios, { AxiosInstance } from 'axios';

export class RankingApi {
  protected readonly instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      timeoutErrorMessage: 'Timeout exceeded',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para añadir el token automáticamente
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

 // GET /userscorespolla/polla/{pollaId}?page=0&size=100
getRankingByPolla = async (pollaId: number) => {
  const res = await this.instance.get(`/userscorespolla/polla/${pollaId}`, {
    params: {
      page: 0,
      size: 100, // o el número de usuarios que quieres traer
    },
  });
  return res.data;
};


  // GET /userscorespolla/subpolla/{subPollaId}
  getRankingBySubpolla = async (subpollaId: number) => {
    const res = await this.instance.get(`/userscorespolla/subpolla/${subpollaId}`);
    return res.data;
  };

  // GET /userscorespolla/user/{userId}/pollas
  getPollaIdsByUser = async (userId: number) => {
    const res = await this.instance.get(`/userscorespolla/user/${userId}/pollas`);
    return res.data;
  };

  // GET /userscorespolla/position/polla/{pollaId}/users/{userId}
  getUserPositionInPolla = async (pollaId: number, userId: number) => {
    const res = await this.instance.get(`/userscorespolla/position/polla/${pollaId}/users/${userId}`);
    return res.data;
  };

  // GET /userscorespolla/position/subpolla/{subPollaId}/users/{userId}
  getUserPositionInSubpolla = async (subpollaId: number, userId: number) => {
    const res = await this.instance.get(`/userscorespolla/position/subpolla/${subpollaId}/users/${userId}`);
    return res.data;
  };

  // PUT /userscorespolla/update-scores/{pollaId}
  updateScoresByPolla = async (pollaId: number) => {
    const res = await this.instance.put(`/userscorespolla/update-scores/${pollaId}`);
    return res.data;
  };

  // PUT /userscorespolla/update-scores/match/{matchId}
  updateScoresByMatch = async (matchId: number) => {
    const res = await this.instance.put(`/userscorespolla/update-scores/match/${matchId}`);
    return res.data;
  };
}
