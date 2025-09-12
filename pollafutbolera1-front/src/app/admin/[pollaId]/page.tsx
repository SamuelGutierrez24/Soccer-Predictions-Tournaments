"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPollaById } from "@/src/hooks/polla/usePolla";
import { getStatisticsByPollaId } from "@/src/hooks/polla/usePolla"; // importa tu hook aquí
import SoccerLoader from "@/src/components/ui/SoccerLoader";

export default function PollaDashboardPage() {
  const { pollaId } = useParams();
  const [polla, setPolla] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    if (typeof pollaId === "string") {
      setLoading(true);

      try {
        const pollaData = await getPollaById(pollaId);
        setPolla(pollaData);
      } catch (error) {
        console.error("Error al obtener los datos de la polla:", error);
      }

      try {
        const statsData = await getStatisticsByPollaId(pollaId);
        setStatistics(statsData);
      } catch (error) {
        console.error("Error al obtener las estadísticas de la polla:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  fetchData();
}, [pollaId]);


  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <SoccerLoader />
      </div>
    );
  }

  if (!polla) {
    return <p>No se encontró la polla</p>;
  }

  console.log("Statistics data:", statistics);
  const remainingDays = calculateRemainingDays(polla.endDate);

  return (
    <div className="flex min-h-screen">
      <main className="container mx-auto px-10 py-6 bg-white rounded-lg shadow-sm p-8">
        {/* Info principal */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 max-w-full mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Información de la polla
          </h2>
          <p className="text-base text-gray-700">
            <strong>Torneo:</strong> {polla.tournament.name}
          </p>
          <p className="text-base text-gray-700">
            <strong>Empresa:</strong> {polla.company.name}
          </p>
          <p className="text-base text-gray-700">
            <strong>Fecha de finalización:</strong>{" "}
            {new Date(polla.endDate).toLocaleDateString()}
          </p>
          <p className="mt-4 text-lg font-semibold text-blue-700">
            ⏳ Faltan {remainingDays} día{remainingDays !== 1 ? "s" : ""} para
            finalizar
          </p>
        </div>

        {/* Estadísticas en cards */}
        {statistics && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-full">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Número de usuarios
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {statistics.numUsers}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Número de apuestas
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {statistics.numbets}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Usuario MVP
              </h3>
              <p className="text-2xl font-semibold text-blue-700">
                {statistics.MVPuser?.trim() ? statistics.MVPuser : "Ninguno"}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Partidos jugados
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {statistics.playedMatchs}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Partidos restantes
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {statistics.leftMatchs}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Promedio de puntos por usuario
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {statistics.meanPointsPerUser}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
