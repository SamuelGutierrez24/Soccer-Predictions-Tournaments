'use client';

import { use } from 'react';           
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/src/hooks/auth/userCurrentUser';
import { pollaService } from '@/src/apis';
import { PollaGetDTO } from '@/src/interfaces/polla/PollaGet.interface';

type RouteParams = { section: string };
type Polla = { id: string; nombre: string };

export default function Selector(
  { params }: { params: Promise<RouteParams> }
) {
  const { section } = use(params);
  const router = useRouter();

  const [pollas, setPollas] = useState<PollaGetDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const data = await pollaService.getPollasByCompanyId(parseInt(user.company));
        setPollas(data);
      } catch (err: any) {
        setError(err?.message ?? 'Error cargando pollas');
      } finally {
        setLoading(false);
      }
    })();
  }, [user, section, router]);

  if (loading) return <p className="p-6 text-center text-indigo-600 font-medium animate-pulse">Cargando…</p>;
  if (error) return <p className="p-6 text-center text-red-600 font-semibold">{error}</p>;
  if (pollas.length === 0) return <p className="p-6 text-center text-gray-500">No hay pollas para elegir.</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">
        Elige una polla
      </h1>

      <ul className="space-y-4">
        {pollas.map(p => (
          <li key={p.id}>
            <button
              className="
                w-full 
                rounded-xl 
                bg-gradient-to-r 
                from-blue-600 
                via-blue-700 
                to-indigo-700 
                text-white 
                font-semibold 
                py-5 
                shadow-lg
                transition 
                transform 
                hover:scale-[1.02] 
                hover:brightness-110
                focus:outline-none 
                focus:ring-4 
                focus:ring-blue-500
              "
              onClick={() => router.push(`/admin/${p.id}/${section}`)}
            >
              [{p.id}] Polla de {p.tournament.name}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
