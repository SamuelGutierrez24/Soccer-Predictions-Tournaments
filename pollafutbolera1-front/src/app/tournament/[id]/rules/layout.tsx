import type React from "react"

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="rules-layout">{children}</div>
}

