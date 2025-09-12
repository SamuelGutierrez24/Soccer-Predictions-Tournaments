// hooks/usePreloadedUsers.ts
import { useEffect, useState } from 'react';
import { PreloadUserApi } from "@/src/apis/preloadUser.api";
import { preloadedUser } from '@/src/interfaces/preload-user.interface';

export function usePreloadedUsers(pollaId: number) {
  const [data, setData] = useState<preloadedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (pollaId === -1) {
          setData([]);
        } else {
          const service = new PreloadUserApi(
            process.env.NEXT_PUBLIC_API_BASE_URL || ''
          );
          const users = await service.getPreLoadUsersByPollaId(pollaId);
          console.log('Preloaded users:', users);
          setData(users.content);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pollaId]);

  return { data, loading, error };
}
