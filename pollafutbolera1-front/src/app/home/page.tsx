"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';
import ActionAreaCard from '@/src/components/user/ActionAreaCard';
import { getPollasByUser } from '@/src/hooks/userscorespolla/useGetPollaByUser';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface PollaCard {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomePage() {
  const router = useRouter();
  const [pollasData, setPollasData] = useState<PollaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPollas = async () => {
      setIsLoading(true);
      try {
        
        const jwt = Cookies.get("currentUser");
        if (!jwt) {
          router.push("/login");
          return;
        }

        const response = await getPollasByUser(JSON.parse(jwt).accessToken);
        
        const before = ["Vive", "Experimenta", "Disfruta", "Celebra", "Acompaña", "Participa en", "Únete a", "Conquista"];
        const after = ["junto a", "con", "en compañía de", "al lado de", "en colaboración con", "en alianza con", "en asociación con"];
        
        const transformedPollas = response.map((polla: any) => ({
          id: polla.id,
          title: polla.tournament?.name || 'Torneo',
          description: `${before[Math.floor(Math.random() * before.length)]} la ${polla.tournament?.description || 'competición'} ${after[Math.floor(Math.random() * after.length)]} ${polla.company?.name || 'nuestra empresa'}`,
          imageUrl: polla.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image',
        }));
        
        setPollasData(transformedPollas);
      } catch (err: any) {
        console.error('Error fetching pollas:', err);
        setError(err.message || 'Error al cargar las pollas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPollas();
  }, []);

  const handleCardClick = (pollaId?: string) => {
    if (pollaId) {
      // Set pollaId cookie
      Cookies.set("pollaId", pollaId, { expires: 1 });
      router.push(`/polla/${pollaId}`);
    }
  };

  const handleExplore = () => {
    router.push("/pollas/explore");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pollas disponibles</h1>
          <p className="text-gray-600">Selecciona un torneo para participar y crear tus predicciones</p>
          <p className="text-gray-500 text-sm mt-2">O unete a una nueva polla</p>
          <button
            onClick={handleExplore}
            className="px-6 py-2 my-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-150 text-lg"
          >
            Explorar Pollas
          </button>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <p className="text-sm">Mostrando datos de respaldo</p>
          </div>
        )}
        
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pollasData.map((card, index) => (
              <div 
                key={index} 
                className="transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick(card.id)}
              >
                <ActionAreaCard
                  title={card.title}
                  description={card.description}
                  image={card.imageUrl}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}