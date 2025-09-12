'use client'

import { useParams } from 'next/navigation'
import TournamentStats from '@/src/components/stats/TournamentStats'

export default function Page() {
  const { tournamentId } = useParams() as { tournamentId: string }
  return <TournamentStats tournamentId={tournamentId} />
}
