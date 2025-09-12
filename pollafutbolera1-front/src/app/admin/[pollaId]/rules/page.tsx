"use client";
import RulesDisplay from "@/src/components/tournament/rules-display";
import SoccerLoader from "@/src/components/ui/SoccerLoader";
import { useState, useEffect } from "react";
import { pollaService } from "@/src/apis";

export default function TournamentRulesPage({
  params,
}: {
  params: Promise<{ pollaId: string }>;
}) {
  const [loading, setLoading] = useState(true);
  const [platformConfig, setPlatformConfig] = useState<string>("");
  const [resolvedParams, setResolvedParams] = useState<{
    pollaId: string;
  } | null>(null);


  useEffect(() => {
    const resolveParams = async () => {
      // Resolve the params Promise
      const resolved = await params;
      const polla = await pollaService.getPollaById(resolved.pollaId);
      setPlatformConfig(polla.platformConfig.id || "");
      // console.log("Resolved params:", platformConfig);
      setResolvedParams(resolved);
      // Simulate additional loading
      setTimeout(() => {
        setLoading(false);
      }, 900);
    };

    resolveParams();
  }, [params, platformConfig]);

  // if (!resolvedParams) {
  //   return (
  //     <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
  //       <SoccerLoader />
  //     </div>
  //   );
  // }

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
          <h1 className="text-2xl font-bold mb-4">Reglas de la Polla</h1>
          <RulesDisplay tournamentId={platformConfig} />
        </div>
        {/* <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-600 border-l-4 popoya-red-accent pl-3 mb-8">
            REGLAS
          </h1>
          <div className="max-w-4xl mx-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
            <RulesDisplay tournamentId={resolvedParams.pollaId} />
          </div>
        </div> */}
      </div>
    </div>
  );
}