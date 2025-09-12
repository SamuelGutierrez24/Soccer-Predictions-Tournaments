"use client";
import * as React from "react";
import { PollaEditForm } from "../../../../components/polla/PollaEditForm";
import SoccerLoader from "@/src/components/ui/SoccerLoader";
// import Navbar from '@/src/components/layout/Navbar';
// import Footer from '@/src/components/layout/Footer';
import { useParams } from "next/navigation";

export default function AdminPollaEditPage() {
  // const params = useParams();
  // const id = params.id as string;
  const { pollaId } = useParams() as { pollaId: string };
  const [loading, setLoading] = React.useState(true);

  // Simular loading inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de loading

    return () => clearTimeout(timer);
  }, []);

  console.log("Polla ID:", pollaId);

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
        <div className="flex flex-col min-h-screen bg-white-50">
          {/* <Navbar /> */}

          <div className="container mx-auto px-10 py-6">
            <h1 className="text-2xl font-bold mb-4">Editar Polla</h1>
              <PollaEditForm pollaId={pollaId} />
          </div>
        </div>
      </div>
    </div>
  );
}
