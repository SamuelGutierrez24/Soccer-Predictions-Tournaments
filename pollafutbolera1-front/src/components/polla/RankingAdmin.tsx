'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { userScoresPollaApi } from '@/src/apis';
import { authApi } from '@/src/apis';
import SoccerLoader from '../ui/SoccerLoader';

interface RankingProps {
  pollaId: string;
}

export default function RankingAdmin({ pollaId }: RankingProps) {
  const userCookie = Cookies.get("currentUser");

  const parsedUser = userCookie ? JSON.parse(userCookie) : null;
  const userId = parsedUser?.userId || null;
  const token = parsedUser?.accessToken || null;
  const tenantId = parsedUser?.company?.toString() || "1";

  const [rankingData, setRankingData] = useState<any>({ top3: [], others: [] });
  const [userRanking, setUserRanking] = useState<any>(null);
  const [isLoadingRanking, setIsLoadingRanking] = useState(true);

  const fetchRankingData = async () => {
    try {
      if (!token || !userId || !pollaId) {
        setIsLoadingRanking(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-TenantId': tenantId,
      };

      // Fetch ranking data
      const res = await userScoresPollaApi.getPollaRanking(pollaId, token);
      const data = res;
      const top3 = data.slice(0, 3);
      const others = data.slice(3);


      setRankingData({ top3, others });
    } catch (err: any) {
      console.error('Error al cargar ranking:', err.message);
    } finally {
      setIsLoadingRanking(false);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  if (isLoadingRanking) {
    return <SoccerLoader />;
  }

  return (
    <div className="text-center">
      {/* Podio Top 3 */}
      <div className="flex justify-center items-end space-x-20 mb-16 relative">
        {[0, 1, 2].map((i, idx) => {
          const user = rankingData.top3[i];
          if (!user) return null;

          const styles = [
            { h: 'h-52', w: 'w-32', font: 'text-5xl' },
            { h: 'h-40', w: 'w-28', font: 'text-4xl' },
            { h: 'h-36', w: 'w-28', font: 'text-4xl' },
          ];

          return (
            <div key={i} className="flex flex-col items-center relative">
              {idx === 0 && <div className="absolute -top-12 text-5xl">👑</div>}
              <div className="relative mb-2">
                <img
                    src={user.photo || "https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"}
                    alt={user.nickname || user.user?.nickname}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
                  />
                <p className="font-semibold text-base mt-2">{user.user.nickname}</p>
              </div>
              <div className={`bg-blue-${400 + idx * 100} ${styles[idx].w} ${styles[idx].h} flex flex-col items-center justify-center rounded-t-lg text-white ${styles[idx].font} font-bold`}>
                {idx + 1}
              </div>
              <div className="mt-2 text-sm bg-blue-600 text-white px-4 py-1 rounded-full">
                {user.score.scores} puntos
              </div>
            </div>
          );
        })}
      </div>

      {/* Resto del ranking */}
      <div className="space-y-5 max-w-2xl mx-auto">
        {rankingData.others.map((user: any, index: number) => (
          <div key={index} className="flex items-center bg-indigo-50 p-5 rounded-lg shadow-md">
            <div className="text-2xl font-bold mr-6">{index + 4}</div>
            <div className="text-left">
              <p className="font-semibold text-lg">{user.user.nickname}</p>
              <span className="text-sm text-gray-500">{user.score.scores} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
