'use client'

import { use } from 'react';
import { useRouter } from 'next/navigation';
import PollaUsersList from "@/src/components/polla/PollaUsersList";

interface PageProps {
  params: Promise<{
    pollaId: string;
  }>;
}

export default function ParticipantesPage({ params }: PageProps) {
  const resolvedParams = use(params); // ✅ Desempaqueta con `use()`
  const pollaId = parseInt(resolvedParams.pollaId, 10);
  const router = useRouter();

  const handleViewPreloadedUsers = () => {
    router.push(`/user/preLoad?pollaId=${pollaId}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="container mx-auto px-10 py-10 bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Participantes de la Polla</h1>
          <button
            onClick={handleViewPreloadedUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver Usuarios Precargados
          </button>
        </div>
        <PollaUsersList pollaId={pollaId} />
      </div>
    </div>
  );
}
