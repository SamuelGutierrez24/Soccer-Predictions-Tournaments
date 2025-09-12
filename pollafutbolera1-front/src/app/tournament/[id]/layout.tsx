import type React from "react"
import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"

export default async function TournamentLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  // Mock user data - this would come from your auth system
  const user = {
    name: "Yule Kapor",
    role: "Admin",
    initials: "YK",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}

