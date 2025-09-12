//archivo temporal para probar funcionalidades

"use client"
import Image from 'next/image'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';
// import { Bracket, IRoundProps } from 'react-brackets';
//import { MatchBet } from '@/src/interfaces/polla/MatchBet.interface';
import { pollaService } from '@/src/apis';
import { useParams } from 'next/navigation';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import DynamicBracket from "@/src/components/bracket/bracket"; 
import { pollaDetailsApi } from "@/src/apis";


function Page() {

  //Url params

  const { 'id-polla': idPollaParam } = useParams();
  const idPolla = typeof idPollaParam === "string" ? idPollaParam : String(idPollaParam ?? "");

  React.useEffect(() => {
    const fetchData = async () => {
      const [
        matchBetsRes,
        tournamentBetsRes,
        currentStageRes,
        stagesRes,
        groupsRes,
        teamsRes,
        matchesRes,
        tournamentRes
      ] = await Promise.all([
        pollaDetailsApi.getMatchBets(idPolla),
        pollaDetailsApi.getTournamentBets(idPolla),
        pollaDetailsApi.getCurrentStageName(idPolla),
        pollaDetailsApi.getStagesByTournament(idPolla),
        pollaDetailsApi.getGroupsByPolla(idPolla),
        pollaDetailsApi.fetchTeams(idPolla),
        pollaDetailsApi.getMatchesByTournament(idPolla),
        pollaDetailsApi.getTournamentByIdPlural(idPolla)
      ]);
      // Aquí puedes manejar los resultados, por ejemplo, guardarlos en el estado
    };

    fetchData();
  }, [idPolla]);


  return (
    <div className="w-screen">
      <Navbar />
      <div className="w-full">
        <div className="relative w-full h-[70vh]">
          <Image
            className="w-full h-full object-cover"
            src={"/pollas/estadio-fondo.png"}
            width={2000}
            height={2000}
            alt="fondo estadio"
          />
          <div className="absolute top-20 left-0 w-full flex items-center justify-between xl:px-28 lg:px-20 md:px-10 sm:px-5 px-2">
            <div className="w-1/3 mt-4 text-white">
              <div className="border-l-4 border-l-red-500 pl-2 text-xl mb-3">
                <p className="font-bold">Pronostica los partidos</p>
                <p className="font-bold">(Fase Eliminatoria)</p>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  className="bg-white px-10 py-3 rounded-2xl flex flex-row"
                  href="#"
                >
                  <div className="w-1/3 flex space-x-3 justify-around">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <Image
                        className="h-6 w-auto"
                        src={"/pollas/countries-icons/US-flag.png"}
                        width={2000}
                        height={2000}
                        alt=""
                      />
                      <p className="text-black font-bold">USA</p>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-black font-bold">VS</p>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <Image
                        className="h-6 w-auto"
                        src={"/pollas/countries-icons/Netherlands-flag.png"}
                        width={2000}
                        height={2000}
                        alt=""
                      />
                      <p className="text-black font-bold">NED</p>
                    </div>
                  </div>
                  <div className="w-2/3 text-black flex flex-col justify-center items-center space-y-2">
                    <p className="text-justify font-bold text-xl">
                      MAR 16/12 - 14:30PM
                    </p>
                    <div className="bg-[#FDE4A1] rounded-4xl py-2 px-8 font-bold flex flex-row justify-center items-center w-fit">
                      Ver Online <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  </div>
                </Link>
                {/* Puedes duplicar este bloque para más partidos destacados */}
                <div className="w-full flex flex-col items-end text-black">
                  <div className="bg-[#FDE4A1] rounded-4xl py-4 px-8 font-bold flex flex-row justify-center items-center w-fit">
                    Todos los partidos
                  </div>
                </div>
              </div>
            </div>
            <div className="w-md">
              <Image
                className="w-md h-md"
                src={"/pollas/logo-popoya.png"}
                width={500}
                height={500}
                alt="Logo Popoya"
              />
            </div>
            <div className="w-1/3" />
          </div>
        </div>
      </div>

      {/* Aquí insertamos el bracket dinámico */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
        </h2>
        <DynamicBracket />
      </div>

      <Footer />
    </div>
  );
}

export default Page;
