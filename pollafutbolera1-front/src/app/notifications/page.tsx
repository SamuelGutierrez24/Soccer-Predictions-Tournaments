"use client";

import Navbar from "@/src/components/layout/Navbar";
import NotificationBell from "@/src/components/layout/NotificationBell";
import { useCurrentUser } from "@/src/hooks/auth/userCurrentUser";
import { useUserProfile } from "@/src/hooks/auth/useUserProfile";

export default function NotificacionesPage() {
  const { user } = useCurrentUser();
  const { profile, loading } = useUserProfile(user?.userId);
  const navbarUser = profile
    ? {
        name: profile.name || profile.nickname || "Usuario",
        role: profile.role ? `Rol ${profile.role}` : "Usuario",
        avatar: profile.photo,
        initials: (profile.name || profile.nickname || "U").slice(0, 2).toUpperCase(),
      }
    : user
    ? {
        name: "Usuario",
        role: "Usuario",
        avatar: undefined,
        initials: "US",
      }
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar  />
      <main className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>Panel de Notificaciones</span>
          <NotificationBell />
        </h1>
        <div className="mt-6">
          {loading ? (
            <p className="text-gray-400">Cargando perfil...</p>
          ) : (
            <p className="text-gray-600">Haz clic en la campana para ver tus notificaciones recientes.</p>
          )}
        </div>
      </main>
    </div>
  );
}
