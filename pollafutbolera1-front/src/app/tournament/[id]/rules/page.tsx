import RulesDisplay from "@/src/components/tournament/rules-display"

export default async function TournamentRulesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-neutral-600 border-l-4 popoya-red-accent pl-3 mb-8">REGLAS</h1>

      <div className="max-w-4xl mx-auto rounded-3xl border border-gray-200 shadow-sm bg-white">

        <RulesDisplay tournamentId={id} />

      </div>
    </div>
  )
}

