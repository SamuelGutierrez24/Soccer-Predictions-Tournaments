"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import MultiStageNavbar, {
  NavbarSelection,
} from "@/src/components/ui/MultiStageNavbar";
import Matches from "@/src/components/tournament/matches/Matches";
import Groups from "@/src/components/tournament/groups/Groups";
import UpcomingMatches from "@/src/components/tournament/matches/UpcomingMatches";
import CompletedMatches from "@/src/components/tournament/matches/CompletedMatches";
import RoundOf16Matches from "@/src/components/tournament/matches/RoundOf16Matches";
import QuarterFinalMatches from "@/src/components/tournament/matches/QuarterFinalMatches";
import FinalMatches from "@/src/components/tournament/matches/FinalMatches";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import Teams from "@/src/components/tournament/teams/Teams";
import SoccerLoader from "@/src/components/ui/SoccerLoader";
import FullBracket from "@/src/components/bracket/FullBracket";
import Ranking from "@/src/components/polla/Ranking";
import TournamentStatistics from "@/src/components/stats/TournamentStats";
import { Team } from "@/src/interfaces/polla/team.interface";
import { Match } from "@/src/interfaces/polla/match.interface";
import Image from "next/image";
import MyBets from "@/src/components/polla/MatchBets";
import { Polla } from "@/src/interfaces/polla.interface";
import { Group, MatchBet, Stage } from "@/src/interfaces/polla";
import { TournamentBet } from "@/src/interfaces/polla/tournament_bet.interface";
import { Tournament } from "@/src/interfaces/polla/tournament.interface";
import { pollaDetailsApi } from "@/src/apis";
import { ViewRewardsPage } from "@/src/components/rewards/ViewRewardsPage";
import { SubPollaNav } from "@/src/components/subpollas/SubPolllaNav";

const on400 = async <T,>(p: Promise<T>, fallback: T): Promise<T> => {
  try {
    return await p;
  } catch (e: any) {
    if (e?.response?.status === 400) return fallback;
    throw e;
  }
};

async function loadPollaData(
  pollaId: string,
  router: any
): Promise<{
  polla: Polla | null;
  matchBets: MatchBet[];
  tournamentBet: TournamentBet | null;
  currentStage: string;
  stages: Stage[];
  groups: Group[];
  teams: Team[];
  matches: Match[];
  tournament: Tournament | null;
}> {
  const polla = await on400(pollaDetailsApi.getPolla(pollaId), null);
  if (!polla) {
    return {
      polla: null,
      matchBets: [],
      tournamentBet: null,
      currentStage: "",
      stages: [],
      groups: [],
      teams: [],
      matches: [],
      tournament: null,
    };
  }

  const torneoId = String(polla.tournament.id);

  const tasks = [
    {
      key: "matchBets",
      fn: () => pollaDetailsApi.getMatchBets(pollaId),
      fallback: [],
    },
    {
      key: "tournamentBet",
      fn: () => pollaDetailsApi.getTournamentBets(pollaId),
    },
    {
      key: "currentStage",
      fn: () => pollaDetailsApi.getCurrentStageName(torneoId),
      fallback: "",
    },
    {
      key: "stages",
      fn: () => pollaDetailsApi.getStagesByTournament(torneoId),
      fallback: [],
    },
    {
      key: "groups",
      fn: () => pollaDetailsApi.getGroupsByPolla(pollaId),
      fallback: [],
    },
    {
      key: "teams",
      fn: () => pollaDetailsApi.fetchTeams(torneoId),
      fallback: [],
    },
    {
      key: "matches",
      fn: () => pollaDetailsApi.getMatchesByTournament(torneoId),
      fallback: [],
    },
    {
      key: "tournament",
      fn: () => pollaDetailsApi.getTournamentByIdPlural(torneoId),
      fallback: null,
    },
  ] as const;

  const settled = await Promise.allSettled(tasks.map((t) => t.fn()));

  const data: any = { polla };
  settled.forEach((res, idx) => {
    const { key } = tasks[idx];
    data[key] = res.status === "fulfilled" ? res.value : tasks[idx];
  });

  return data as ReturnType<typeof loadPollaData>;
}

export default function PollaPage() {
  const params = useParams() as { "id-polla"?: string | string[] };
  const rawId = params["id-polla"];
  const pollaId = Array.isArray(rawId) ? rawId[0] : rawId ?? "";
  const router = useRouter();

  const [polla, setPolla] = useState<Polla | null>(null);
  const [matchBets, setMatchBets] = useState<MatchBet[]>([]);
  const [tournamentBet, setTournamentBet] = useState<TournamentBet | null>(
    null
  );
  const [currentStage, setCurrentStage] = useState<string>("");
  const [stages, setStages] = useState<Stage[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [winnerTeam, setWinnerTeam] = useState<Team | null>(null);
  const [topScorerTeam, setTopScorerTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pollaId) return;
    setLoading(true);

    async function loadAll() {
      setLoading(true);
      setError(null);

      try {
        const pollaRes = await pollaDetailsApi.getPolla(pollaId);
        setPolla(pollaRes);

        const torneoId = String(pollaRes.tournament.id);

        const results = await Promise.allSettled([
          pollaDetailsApi.getMatchBets(pollaId),
          pollaDetailsApi.getTournamentBets(pollaId),
          pollaDetailsApi.getCurrentStageName(torneoId),
          pollaDetailsApi.getStagesByTournament(torneoId),
          pollaDetailsApi.getGroupsByPolla(pollaId),
          pollaDetailsApi.fetchTeams(torneoId),
          pollaDetailsApi.getMatchesByTournament(torneoId),
          pollaDetailsApi.getTournamentByIdPlural(torneoId),
        ]);

        const [
          matchBetsResult,
          tournamentBetsResult,
          currentStageResult,
          stagesResult,
          groupsResult,
          teamsResult,
          matchesResult,
          tournamentResult,
        ] = results;

        if (matchBetsResult.status === "fulfilled")
          setMatchBets(matchBetsResult.value);
        if (tournamentBetsResult.status === "fulfilled")
          setTournamentBet(tournamentBetsResult.value);
        if (currentStageResult.status === "fulfilled")
          setCurrentStage(currentStageResult.value);
        if (stagesResult.status === "fulfilled") setStages(stagesResult.value);
        if (groupsResult.status === "fulfilled") setGroups(groupsResult.value);
        if (teamsResult.status === "fulfilled") setTeams(teamsResult.value);
        if (matchesResult.status === "fulfilled")
          setMatches(matchesResult.value);
        if (tournamentResult.status === "fulfilled")
          setTournament(tournamentResult.value);
      } catch (e: any) {
        router.push("/auth/login");
        console.error(e);
        setError(e.message ?? "Error inesperado");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [pollaId]);

  useEffect(() => {
    function findWinnerAndTopScorer() {
      if (!tournamentBet || !teams.length) return;

      const winner = teams.find(
        (team) => team.id === tournamentBet?.winnerTeamId
      );
      setWinnerTeam(winner ?? null);

      const topScorer = teams.find(
        (team) => team.id === tournamentBet?.topScoringTeamId
      );
      setTopScorerTeam(topScorer ?? null);
    }
    findWinnerAndTopScorer();
  }, [tournamentBet]);

  const [sel, setSel] = useState<NavbarSelection>({
    level1: "partidos",
    level2: "todo",
  });

  const renderContent = () => {
    switch (sel.level1) {
      case "partidos":
        switch (sel.level2) {
          case "todo":
            return (
              <>
                <Breadcrumb text="Partidos" />
                <Matches
                  matches={matches}
                  teams={teams}
                  tournament={tournament}
                  pollaId={rawId}
                  tournamentBet={tournamentBet}
                />
              </>
            );
          case "porJugar":
            return (
              <>
                <Breadcrumb text="Partidos → Por jugar" />
                <UpcomingMatches
                  matches={matches}
                  teams={teams}
                  stages={stages}
                  pollaId={pollaId}
                />
              </>
            );
          case "jugados":
            return (
              <>
                <Breadcrumb text="Partidos → Jugados" />
                <CompletedMatches
                  matches={matches}
                  teams={teams}
                  stages={stages}
                  tournament={tournament}
                  pollaId={rawId}
                  tournamentBet={tournamentBet}
                />
              </>
            );
          case "misPredicciones":
            return (
              <>
                <Breadcrumb text="Partidos → Mis predicciones" />
                <MyBets
                  matchBets={matchBets}
                  tournamentBet={tournamentBet}
                  tournament={tournament}
                  winnerTeam={winnerTeam}
                  topScorerTeam={topScorerTeam}
                  teams={teams}
                />
              </>
            );
          case "fases":
            switch (sel.level3) {
              case "bracket":
                return (
                  <>
                    <Breadcrumb text="Partidos → Fases → Bracket" />
                    <FullBracket
                      stages={stages}
                      groups={groups ?? []}
                      teams={teams}
                      matches={matches}
                      onMatchClick={(m) => console.log("Clicked", m)}
                    />
                  </>
                );
              case "grupos":
                return (
                  <>
                    <Breadcrumb text="Partidos → Fases → Grupos" />
                    <Groups groups={groups} />
                  </>
                );
              case "octavos":
                return (
                  <>
                    <Breadcrumb text="Partidos → Fases → Octavos" />
                    <RoundOf16Matches
                      matches={matches}
                      teams={teams}
                      stages={stages}
                      tournament={tournament}
                      pollaId={rawId}
                      tournamentBet={tournamentBet}
                    />
                  </>
                );
              case "cuartos":
                return (
                  <>
                    <Breadcrumb text="Partidos → Fases → Cuartos" />
                    <QuarterFinalMatches
                      matches={matches}
                      teams={teams}
                      stages={stages}
                      tournament={tournament}
                      pollaId={rawId}
                      tournamentBet={tournamentBet}
                    />
                  </>
                );
              case "final":
                return (
                  <>
                    <Breadcrumb text="Partidos → Fases → Final" />
                    <FinalMatches
                      matches={matches}
                      teams={teams}
                      stages={stages}
                      tournament={tournament}
                      pollaId={rawId}
                      tournamentBet={tournamentBet}
                    />
                  </>
                );
              default:
                return null;
            }
          default:
            return (
              <>
                <Breadcrumb text="Partidos" />
              </>
            );
        }
      case "ranking":
        return (
          <>
            <Breadcrumb text="Ranking" />
            <Ranking pollaId={pollaId} />
          </>
        );
      case "estadisticas":
        const tournamentId = tournament?.id;
        return (
          <>
            <TournamentStatistics tournamentId={tournamentId ? String(tournamentId) : ''} />
          </>
        );
      case "rewards":
        return (
          <>
            <Breadcrumb text="Premios" />
            <ViewRewardsPage pollaId={pollaId} />
          </>
        );
      case "equipos":
        return (
          <>
            <Breadcrumb text="Equipos" />
            <Teams teams={teams} />
          </>
        );
      
      case 'SubPollas':
        return (
          <>
              <SubPollaNav />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-screen bg-white">
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
        <Navbar />

        <main className="">
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              <div className="w-full">
                <div className="relative w-full h-[70vh]">
                  <Image
                    className="w-full h-full"
                    src={"/pollas/estadio-fondo.png"}
                    width={2000}
                    height={2000}
                    alt={""}
                  ></Image>
                  <div className="absolute top-20 left-0 w-full transform flex items-center justify-between 2xl:px-28 xl:px-14 md:px-10 sm:px-5 px-3">
                  
                    <div className="hidden lg:flex w-1/2 justify-center items-center">
                      <Image
                        className="w-md h-md"
                        src={"/pollas/logo-popoya.png"}
                        width={500}
                        height={500}
                        alt={""}
                      ></Image>
                    </div>
                  </div>
                </div>
              </div>
              <MultiStageNavbar onChange={setSel} />
              <div className="px-4 sm:px-10 md:px-20 py-20 mb-10">
                <div className="mt-4">{renderContent()}</div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
