import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/src/components/ui/ToastProvider";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastProvider />
        </body>

    </html>
  )
}

