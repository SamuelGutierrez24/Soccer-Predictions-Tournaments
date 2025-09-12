'use client'

import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"

interface Team {
  id: number
  name: string
  logoUrl: string
}

interface Tournament {
  id: number
  name: string
  description: string
  winner_team_id: number | null
  fewest_goals_conceded_team_id: number | null
  top_scoring_team_id: number | null
  initial_date: string
  final_date: string
  tournament_logo: string
  deleted_at: string | null
  year: string | null
}

interface TournamentStatistics {
  tournamentId: number
  winnerTeamId: number
  fewestGoalsConcededTeamId: number
  topScoringTeamId: number
  topScorerId: number
  topScorerName: string
  topScorerTeamId: number
  topScorerUrlImg: string
  createdAt: string
  updatedAt: string
}

interface Props {
  tournamentId: string
}

export default function TournamentStatistics({ tournamentId }: Props) {
  const statsRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [tournamentStats, setTournamentStats] = useState<TournamentStatistics | null>(null)
  const [tournamentInfo, setTournamentInfo] = useState<Tournament | null>(null)
  const [winnerTeam, setWinnerTeam] = useState<Team | null>(null)
  const [bestDefenseTeam, setBestDefenseTeam] = useState<Team | null>(null)
  const [topScoringTeam, setTopScoringTeam] = useState<Team | null>(null)

  const fallbackImg = "https://via.placeholder.com/100x100?text=No+Image"

  const getData = async () => {
    const jwt = Cookies.get("currentUser")
    if (!jwt) return setError("No autorizado")

    try {
      const accessToken = JSON.parse(jwt).accessToken

      const stats = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/statistics?tournamentId=${tournamentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-TenantId": "1"
        }
      }).then(res => res.json())

      const tournament = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/tournament?tournamentId=${tournamentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-TenantId": "1"
        }
      }).then(res => res.json())
      console.log("Tournament Data:", tournament)
      console.log("Tournament Stats:", stats)
      setTournamentStats(stats)

      const year = tournament.initial_date ? new Date(tournament.initial_date).getFullYear() : tournament.year
      setTournamentInfo({ ...tournament, year })

      const fetchTeam = async (id: number): Promise<Team> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/teams/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        })
        if (!res.ok) {
          return {
            id,
            name: "Equipo Desconocido",
            logoUrl: fallbackImg
          }
        }
        return await res.json()
      }

      const [winner, defense, scoring] = await Promise.all([
        fetchTeam(stats.winnerTeamId),
        fetchTeam(stats.fewestGoalsConcededTeamId),
        fetchTeam(stats.topScoringTeamId)
      ])

      setWinnerTeam(winner)
      setBestDefenseTeam(defense)
      setTopScoringTeam(scoring)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [tournamentId])

  const formatDate = (d: string | number) => {
    try {
      return new Date(d).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    } catch {
      return d.toString()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error al cargar</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!tournamentInfo || !tournamentStats) return null

  return (
    <div className="w-full" ref={statsRef}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          {tournamentInfo.tournament_logo && (
            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <img
                src={tournamentInfo.tournament_logo}
                alt={`${tournamentInfo.name} Logo`}
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.src = fallbackImg)}
              />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {tournamentInfo.name}
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
            {tournamentInfo.description}
          </p>

          {tournamentInfo.year && (
            <div className="inline-flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{tournamentInfo.year}</span>
            </div>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Campeón */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-900 dark:bg-gray-700 p-6">
                <h2 className="text-xl font-bold text-white">CAMPEÓN DEL TORNEO</h2>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {winnerTeam?.name || "Cargando..."}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      ID Equipo: {tournamentStats.winnerTeamId}
                    </p>
                  </div>
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 dark:bg-gray-700 rounded-3xl flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600">
                    <img
                      src={winnerTeam?.logoUrl || fallbackImg}
                      alt={winnerTeam?.name}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                      className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Máximo Goleador */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-900 dark:bg-gray-700 p-6">
                <h2 className="text-xl font-bold text-white">MÁXIMO GOLEADOR</h2>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {tournamentStats.topScorerName}
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <p>Equipo ID: {tournamentStats.topScorerTeamId}</p>
                      <p>Jugador ID: {tournamentStats.topScorerId}</p>
                    </div>
                  </div>
                  <div className="w-32 h-32 bg-gray-50 dark:bg-gray-700 rounded-3xl flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <img
                      src={tournamentStats.topScorerUrlImg || fallbackImg}
                      alt={tournamentStats.topScorerName}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mejor Defensa */}
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gray-900 dark:bg-gray-700 p-4">
                <h3 className="text-lg font-bold text-white">MEJOR DEFENSA</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {bestDefenseTeam?.name || "Cargando Equipo..."}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      ID Equipo: {tournamentStats?.fewestGoalsConcededTeamId || "N/A"}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                      Menos goles recibidos
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600">
                    <img
                      src={bestDefenseTeam?.logoUrl || fallbackImg}
                      alt={bestDefenseTeam?.name || "Mejor Defensa"}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                      className="w-20 h-20 object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Más Goleador */}
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gray-900 dark:bg-gray-700 p-4">
                <h3 className="text-lg font-bold text-white">MÁS GOLEADOR</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {topScoringTeam?.name || "Cargando Equipo..."}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      ID Equipo: {tournamentStats?.topScoringTeamId || "N/A"}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                      Más goles anotados
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600">
                    <img
                      src={topScoringTeam?.logoUrl || fallbackImg}
                      alt={topScoringTeam?.name || "Equipo Goleador"}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                      className="w-20 h-20 object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  )

}