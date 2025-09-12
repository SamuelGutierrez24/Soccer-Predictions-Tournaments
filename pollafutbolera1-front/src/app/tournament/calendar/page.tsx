"use client";

import dynamic from "next/dynamic";
import Navbar from "@/src/components/layout/Navbar"; // Importamos la Navbar
import { Tournament } from "@/src/interfaces/polla";

const Calendar = dynamic(
  () => import("@/src/components/tournament/matches/Calendar"), // Importamos el componente Calendar
  { ssr: false }
);

const CalendarPage = () => {
  // Usamos los datos mockeados de torneo

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Añadimos la Navbar aquí */}
      <Navbar />

      <header className="bg-tournament-primary text-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold"></h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
       {/* <Calendar matches={tournament.groups.flatMap(group => group.matches)} /> Pasa los partidos al componente Calendar */}
      </main>
    </div>
  );
};

export default CalendarPage;