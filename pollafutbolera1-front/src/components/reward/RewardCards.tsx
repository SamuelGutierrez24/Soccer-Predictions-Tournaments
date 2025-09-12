"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getRewardsByPolla } from "@/src/hooks/reward/useReward"; // Asegúrate de importar desde la ruta correcta

interface Reward {
  id: number;
  name: string;
  description: string;
  image: string;
  position: number;
  pollaId: number;
}

interface RewardCardsProps {
  pollaId: number;
}

export default function RewardCards({ pollaId }: RewardCardsProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const rewards = await getRewardsByPolla(pollaId);
        setRewards(rewards);
      } catch (error) {
        console.error("Error al obtener los premios:", error);
      } finally {
        setLoading(false);
      }
    };

    if (pollaId) loadRewards();
  }, [pollaId]);

  if (loading) return <p className="text-gray-600">Cargando premios...</p>;
  if (!rewards.length)
    return <p className="text-gray-500">No hay premios disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="relative w-full h-48">
            <img
              src={
                reward.image || "https://placehold.co/400x300?text=Sin+imagen"
              }
              alt={reward.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{reward.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
            <p className="text-sm text-gray-500 font-medium">
              🏆 Puesto: {reward.position}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
