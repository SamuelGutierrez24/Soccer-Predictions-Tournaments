'use client'
import { Check } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { useRules } from "@/src/hooks/rules/useRules"
import { Skeleton } from "@/src/components/ui/skeleton"

export default function RulesDisplay({ tournamentId }: { tournamentId: string }) {
    const { rules } = useRules(tournamentId);

    if (!rules) {
      return (
        <Card className="max-width-4xl mx-auto rounded-3xl border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center md:text-left md:col-span-2">
                <Skeleton className="h-8 w-48 mb-4" />
              </div>
              <div className="text-center md:text">
                <Skeleton className="h-8 w-48 mx-auto md:mx-0 mb-4" />
              </div>
            </div>
            
            <div className="relative">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-gray-100">
                  <div className="flex items-center md:col-span-2">
                    <div className="flex-shrink-0 mr-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <div className="flex justify-center md:justify items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    const ruleItems = rules ? [
      { label: "Campeón del torneo", value: rules.tournamentChampion || 0 },
      { label: "Equipo con más goles", value: rules.teamWithMostGoals || 0 },
      { label: "Marcador exacto", value: rules.exactScore || 0 },
      { label: "Ganador del partido", value: rules.matchWinner || 0 },
    ] : [];
    
    const visibleRules = ruleItems.filter(item => item.value >= 1)
  
    return (
      <Card className="max-width-4xl mx-auto rounded-3xl border border-gray-200 shadow-sm">
        <CardContent className="p-8">
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center md:text-left md:col-span-2">
              <h2 className="text-xl text-neutral-600 font-medium mb-4">Por acierto</h2>
            </div>
            <div className="text-center md:text">
              <h2 className="text-xl text-neutral-600 font-medium mb-4">Puntos que obtienes</h2>
            </div>
          </div>
  
          <div className="relative"> 
            {visibleRules.map((ruleItem, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-gray-100">
                <div className="flex items-center md:col-span-2">
                  <div className="flex-shrink-0 mr-2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-medium text-neutral-800">{ruleItem.label}</span>
                </div>
                <div className="flex justify-center md:justify items-center">
                  <span className="font-medium text-neutral-800">{ruleItem.value}</span>
                  {/* <div className="rule-point-circle">{ruleItem.value}</div> */}
                </div>
              </div>
            ))}
            
            {visibleRules.length === 0 && (
              <div className="py-6 text-center text-neutral-500">
                No hay reglas de puntuación configuradas para este torneo.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }