'use client';
import RewardCards from '@/src/components/reward/RewardCards';
import SoccerLoader from '@/src/components/ui/SoccerLoader';
import { useState, useEffect } from 'react';

export default function RewardsPage({
  params,
}: {
  params: Promise<{ pollaId: string }>;
}) {
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ pollaId: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      // Resolve the params Promise
      const resolved = await params;
      setResolvedParams(resolved);
      // Simulate additional loading
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };

    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
        <SoccerLoader />
      </div>
    );
  }

  const pollaIdNumber = parseInt(resolvedParams.pollaId, 10);

  return (
    <div className="relative min-h-screen bg-white-50">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <SoccerLoader />
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="container mx-auto px-10 py-6">
          <h1 className="text-2xl font-bold mb-4">Premios de la Polla</h1>
          <RewardCards pollaId={pollaIdNumber} />
        </div>
      </div>
    </div>
  );
}