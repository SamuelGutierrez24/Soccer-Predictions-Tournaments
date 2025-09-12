'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

export default function RankingPage() {
  const userCookie = Cookies.get("currentUser");
  const pollaCookie = Cookies.get("pollaId");

  const parsedUser = userCookie ? JSON.parse(userCookie) : null;
  const userId = parsedUser?.userId || null;
  const token = parsedUser?.accessToken || null;
  const tenantId = parsedUser?.company?.toString() || "1"; // <- extrae tenantId dinámicamente como string
  const pollaId = pollaCookie || null;

  const [rankingData, setRankingData] = useState<any>({ top3: [], others: [] });
  const [userRanking, setUserRanking] = useState<any>(null);

  const fetchRankingData = async () => {
    try {
      if (!token || !userId || !pollaId) return;

      const url = `http://localhost:8000/pollafutbolera/userscorespolla/polla/${pollaId}`;
      const posUrl = `http://localhost:8000/pollafutbolera/userscorespolla/position/polla/${pollaId}/users/${userId}`;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-TenantId': tenantId,
      };

      const res = await fetch(url, { headers });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const top3 = data.slice(0, 3);
      const others = data.slice(3);
      setRankingData({ top3, others });

      const currentUser = data.find((u: any) => u.user.id === userId);
      if (currentUser) {
        const posRes = await fetch(posUrl, { headers });
        const position = await posRes.json();

        setUserRanking({
          position,
          name: currentUser.user.name,
          points: currentUser.score.scores,
        });
      }
    } catch (err: any) {
      console.error('Error al cargar ranking:', err.message);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8"></h1>

        {/* Podio Top 3 */}
        <div className="flex justify-center items-end space-x-20 mb-16 relative">
          {[1, 0, 2].map((i, idx) => {
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
                  <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  <p className="font-semibold text-base mt-2">{user.user.name}</p>
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
                <p className="font-semibold text-lg">{user.user.name}</p>
                <span className="text-sm text-gray-500">{user.score.scores} pts</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Posición del usuario actual */}
      {userRanking && (
        <div className="bg-white shadow-lg rounded-xl py-6 px-8 mb-12 max-w-md mx-auto text-center">
          <p className="text-gray-500 text-sm mb-2">Tu posición actual</p>
          <div className="text-4xl font-extrabold text-blue-600 mb-2">#{userRanking.position}</div>
          <div className="text-lg font-semibold">{userRanking.name}</div>
          <div className="text-gray-500 text-sm">{userRanking.points} puntos</div>
        </div>
      )}

      <Footer />
    </div>
  );
}
