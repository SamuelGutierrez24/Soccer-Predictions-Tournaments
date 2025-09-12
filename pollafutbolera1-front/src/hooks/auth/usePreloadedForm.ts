// hooks/usePreloadedUser.ts
import { useState, useEffect } from 'react';
import { preloadUserApi } from '@/src/apis';
import { preloadedUser } from '@/src/interfaces/preload-user.interface';

// Configura la URL base de tu API (podrías pasarla como parámetro o tenerla en un .env)


export function usePreloadedForm(idUser: string) {
  const [user, setUser] = useState<preloadedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserByCedula = async () => {
      try {
        setLoading(true);
        const userData = await preloadUserApi.getPreloadUserById(idUser);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    if (idUser) {
      fetchUserByCedula();
    }
  }, [idUser]);

  return { user };
}