'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import NotificationBell from "./NotificationBell"
import { useCurrentUser } from "@/src/hooks/auth/userCurrentUser";
import { useUserProfile } from "@/src/hooks/auth/useUserProfile";

interface User {
  name: string
  role: string
  avatar?: string
  initials?: string
}

export default function NavbarAdmin() {
  const { user: authUser } = useCurrentUser();
  const { profile } = useUserProfile(authUser?.userId);
  const router = useRouter()

  const user = profile
    ? {
        name: profile.name || profile.nickname || "Usuario",
        role: profile.role ? `Rol ${profile.role}` : "Usuario",
        avatar: profile.photo,
        initials: (profile.name || profile.nickname || "U").slice(0, 2).toUpperCase(),
      }
    : authUser
    ? {
        name: "Usuario",
        role: "Usuario",
        avatar: undefined,
        initials: "US",
      }
    : undefined;

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Juega")

  // Logout function
  const handleLogout = () => {
    Cookies.remove("currentUser");
    router.push("/auth/login");
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-1 py-3">
        <div className="grid grid-cols-3 items-center">
          <div className="flex justify-start">
                <Image
                          src="/pollas/logo-popoya-navbar.png"
                          alt="POPOYA"
                          width={120}
                          height={40}
                          className="h-12 w-auto hover:opacity-90 transition-opacity"
                          priority
                        />
          </div>
            
          <div className="hidden lg:flex justify-center">
          </div>

          <div className="flex justify-end items-center gap-4">
            <NotificationBell />
            {user && (
              <Link href="/user/profile" className="hidden md:flex items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Ir a mi perfil">
                <div className="mr-3 text-right">
                  <div className="font-medium group-hover:text-blue-500 transition-colors">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                {user.avatar ? (
                  <div className="relative">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold ring-2 ring-transparent group-hover:ring-blue-500 transition-all">
                    {user.initials || user.name.substring(0, 2)}
                  </div>
                )}
              </Link>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-4 p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
            </button>

            <button 
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 ml-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-3 border-t pt-3">
            <ul className="space-y-2">
              
              {user && (
                <li className="flex items-center py-2 px-4 mt-4 border-t">
                  <Link href="/user/profile" className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Ir a mi perfil">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full mr-3 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-3 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                        {user.initials || user.name.substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium group-hover:text-blue-500 transition-colors">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                  </Link>
                </li>
              )}
              
              {/* Logout Button in Mobile Menu */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2 text-red-500" />
                  <span>Cerrar sesión</span>
                </button>
              </li>
              
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}