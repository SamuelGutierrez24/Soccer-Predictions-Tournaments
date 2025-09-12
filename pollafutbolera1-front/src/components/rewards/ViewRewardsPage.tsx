import React, { useEffect, useState } from "react";
import { RewardsCard } from "./RewardsCard";
import { getRewardsByPolla } from "../../hooks/reward/useReward";

const positionLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Primer Puesto", color: "#DAA520" },
  2: { label: "Segundo Puesto", color: "#983333" },
  3: { label: "Tercer Puesto", color: "#2B63A6" },
};

interface ViewRewardsPageProps {
  pollaId: string;
}

export function ViewRewardsPage({ pollaId }: ViewRewardsPageProps) {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!pollaId) {
      setError(true);
      setLoading(false);
      return;
    }

    getRewardsByPolla(Number(pollaId))
      .then((data) => {
        setRewards(data);
        setError(false);
      })
      .catch(() => {
        setRewards([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [pollaId]);

  // Ordenar por posición para asegurar el orden correcto
  const rewardsByPosition = [3, 1, 2].map((pos) =>
    rewards.find((r) => r.position === pos)
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
    <main className="px-[70px] py-10 max-md:px-10 max-sm:px-5">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-black text-4xl font-normal mb-5">Premios</h1>
        <div className="h-1 bg-blue-600 w-80" />
      </div>
        <div className="relative flex flex-col items-center">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600">Cargando premios...</p>
            </div>
          ) : error || rewards.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600">No se han encontrado premios</p>
            </div>
          ) : (
            <>
              {/* Iconos de podio */}
              <div className="flex justify-center w-full mb-4">
                <div className="w-full max-w-[1200px] grid grid-cols-3 gap-6">
                  {/* Tercer puesto */}
                  <div className="flex justify-center items-end">
                  </div>
                  {/* Primer puesto */}
                  <div className="flex justify-center items-end">
                  </div>
                  {/* Segundo puesto */}
                  <div className="flex justify-center items-end">
                  </div>
                </div>
              </div>
              {/* Podio de premios */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-[1200px] relative justify-items-center items-center align-items-center">
                {/* Tercer puesto */}
                <div className="flex-row justify-center self-end mt-24 justify-items-center align-items-center items-center">
                  
                  <img className="mb-4 justify-center items-center"
                    width="74"
                    height="74"
                    src="https://img.icons8.com/arcade/64/third-place-ribbon.png"
                    alt="third-place-ribbon"
                  />

                  {rewardsByPosition[0] && (
                    <RewardsCard
                      position={positionLabels[3].label}
                      positionColor={positionLabels[3].color}
                      title={rewardsByPosition[0].name}
                      description={rewardsByPosition[0].description}
                      imageUrl={rewardsByPosition[0].image}
                      imageAlt={rewardsByPosition[0].name}
                    />
                  )}
                </div>
                {/* Primer puesto */}
                <div className="flex-row justify-center justify-items-center align-items-center items-center">
                  
                  <img className="mb-4 justify-center items-center"
                    width="74"
                    height="74"
                    src="https://img.icons8.com/arcade/64/first-place-ribbon.png"
                    alt="first-place-ribbon"
                  />

                  {rewardsByPosition[1] && (
                    <RewardsCard
                      position={positionLabels[1].label}
                      positionColor={positionLabels[1].color}
                      title={rewardsByPosition[1].name}
                      description={rewardsByPosition[1].description}
                      imageUrl={rewardsByPosition[1].image}
                      imageAlt={rewardsByPosition[1].name}
                    />
                  )}
                </div>
                {/* Segundo puesto */}
                
                <div className="flex-row justify-center self-end mt-24 justify-items-center align-items-center items-center">
                  
                    <img className="mb-4 justify-center items-center"
                      width="74"
                      height="74"
                      src="https://img.icons8.com/arcade/64/second-place-ribbon.png"
                      alt="second-place-ribbon"
                    />
                  {rewardsByPosition[2] && (
                    <RewardsCard
                      position={positionLabels[2].label}
                      positionColor={positionLabels[2].color}
                      title={rewardsByPosition[2].name}
                      description={rewardsByPosition[2].description}
                      imageUrl={rewardsByPosition[2].image}
                      imageAlt={rewardsByPosition[2].name}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
