import { Skeleton } from "@/src/components/ui/skeleton"
import { Card, CardContent } from "@/src/components/ui/card"

export default function LoadingRules() {
  return (
    <Card className="max-w-4xl mx-auto rounded-3xl border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="text-center md:text-left">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="text-center md:text-left">
            <Skeleton className="h-6 w-40" />
          </div>
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 mr-2 rounded-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="flex justify-center md:justify-start">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

