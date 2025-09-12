"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

const Calendar = dynamic(() => import("@/src/components/tournament/matches/Calendar"), { ssr: false });

const CalendarPage = () => {
  const [tournamentId, setTournamentId] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      try {
        const parsed = JSON.parse(currentUser);
        const id = parsed.tournamentId || null;
        if (id) setTournamentId(String(id));
      } catch (e) {
        console.error("Error parsing currentUser cookie:", e);
      }
    }
  }, []);

  if (!tournamentId) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold text-gray-800">Partidos del Torneo</h1>
      </div>

      <main className="container mx-auto px-4 pb-12">
        <Calendar tournamentId={tournamentId} />
      </main>
    </div>
  );
};

export default CalendarPage;