"use client";

import { useParams } from "next/navigation";
import RankingAdmin from "@/src/components/polla/RankingAdmin";

export default function AdminRankingPage() {
  const { pollaId } = useParams() as { pollaId: string };
  
  if (!pollaId) {
    return <div>No se encontró ID de polla</div>;
  }
  console.log("pollaId:", pollaId);

  return (
    <div className="container mx-auto px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Ranking de la Polla</h1>
      <RankingAdmin pollaId={pollaId} />
    </div>
  );
}
