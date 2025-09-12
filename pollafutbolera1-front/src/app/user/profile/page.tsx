"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/src/hooks/auth/useProfile";
import Cookies from "js-cookie";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

import NotificationPreferencesButton from './NotificationPreferencesButton';
import { NotificationPreferences } from '@/src/components/profile/NotificationPreferencesForm';

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { getMyProfile } = useProfile();
  const [profileData, setProfileData] = useState({
    id: null as number | null,
    cedula: "",
    company: "",
    lastName: "",
    mail: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    photo: "",
    notificationsEmailEnabled: false,
    notificationsSMSEnabled: false,
    notificationsWhatsappEnabled: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    enabledEmail: false,
    enabledSMS: false,
    enabledWhatsapp: false,
  });

  const [prefsLoading, setPrefsLoading] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get("currentUser");
    if (!jwt) {
      // Redirigir al login si no hay JWT
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile(JSON.parse(jwt).accessToken);
        if (profile.error) {
          //router.push("/auth/login");
        } else {
          setProfileData(prev => ({
            ...prev,
            ...profile,
            id: profile.id ?? prev.id
          }));
        }
      } catch (error) {
        //router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchNotificationPrefs = async () => {
      const jwt = Cookies.get("currentUser");
      if (!jwt || profileData.id == null) return;
      try {
        const { default: axios } = await import('axios');
        const { getAuthorizationHeader } = await import('@/src/apis/getAuthorizationHeader');
        const getBaseUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/pollafutbolera";
        const url = `${getBaseUrl()}/user/${profileData.id}/notifications`;
        const headers = { ...getAuthorizationHeader(), 'Content-Type': 'application/json' };
        const res = await axios.get(url, { headers });
        if (res.status === 200 && res.data) {
          setNotificationPrefs({
            enabledEmail: !!res.data.enabledEmail,
            enabledSMS: !!res.data.enabledSMS,
            enabledWhatsapp: !!res.data.enabledWhatsapp,
          });
        }
      } catch (prefsErr) {
        console.error("Error fetching notification preferences:", prefsErr);
      }
    };
    fetchNotificationPrefs();
  }, [profileData.id]);

  const handleEditProfile = () => {
    router.push('profile/edit');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Lógica para actualizar preferencias en backend
  const handleSaveNotificationPrefs = async (prefs: NotificationPreferences) => {
    setPrefsLoading(true);
    try {
      const jwt = Cookies.get("currentUser");
      if (!jwt) throw new Error("No autenticado");
      // Use NotificationBell's pattern: getBaseUrl + getAuthorizationHeader + axios
      const { default: axios } = await import('axios');
      const { getAuthorizationHeader } = await import('@/src/apis/getAuthorizationHeader');
      const getBaseUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/pollafutbolera";
      const parsedJwt = JSON.parse(jwt);
      const userId = profileData.id || parsedJwt.id || parsedJwt.userId;
      const url = `${getBaseUrl()}/user/${userId}/notifications`;
      const headers = { ...getAuthorizationHeader(), 'Content-Type': 'application/json' };
      const body = {
        enabledEmail: prefs.enabledEmail,
        enabledSMS: prefs.enabledSMS,
        enabledWhatsapp: prefs.enabledWhatsapp,
      };
      const res = await axios.put(url, body, { headers });
      if (res.status !== 200 && res.status !== 204) throw new Error('Error actualizando preferencias');
      setNotificationPrefs(prefs);
      setProfileData(prev => ({
        ...prev,
        notificationsEmailEnabled: prefs.enabledEmail,
        notificationsSMSEnabled: prefs.enabledSMS,
        notificationsWhatsappEnabled: prefs.enabledWhatsapp,
      }));
    } finally {
      setPrefsLoading(false);
    }
  }

  return (
    <>
    <Navbar />
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center py-10">
      <main className="flex flex-col px-8 py-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

        <section className="flex flex-col items-center self-center px-8 pt-8 pb-10 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-full">
          {/* Profile header with photo and edit button */}
          <div className="relative w-full flex flex-col items-center pb-8 border-b border-gray-200">
            <Avatar 
              src={profileData.photo || undefined}
              alt={profileData.nickname}
              sx={{ width: 150, height: 150, mb: 3, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
            />
            <h2 className="text-2xl font-bold text-gray-800">{profileData.nickname}</h2>
            <p className="text-lg text-gray-600 mt-1">
              {profileData.name} {profileData.lastName}
            </p>
            
            <button
              onClick={handleEditProfile}
              className="absolute top-0 right-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 flex items-center"
            >
              <EditIcon sx={{ fontSize: 20, marginRight: 1 }} />
              Editar perfil
            </button>
          </div>

          {/* Profile information sections */}
          <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Datos Personales</h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Cédula</p>
                <p className="text-lg font-medium">{profileData.cedula}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="text-lg font-medium">{profileData.name}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Apellido</p>
                <p className="text-lg font-medium">{profileData.lastName}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h3>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Correo Electrónico</p>
                <p className="text-lg font-medium">{profileData.mail}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="text-lg font-medium">{profileData.phoneNumber}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Empresa</p>
                <p className="text-lg font-medium">{profileData.company}</p>
              </div>
            </div>
          </div>
          {/* Sección de preferencias de notificación */}
          <NotificationPreferencesButton
            currentPreferences={notificationPrefs}
            onSave={handleSaveNotificationPrefs}
          />
        </section>
      </main>
    </div>
    <Footer></Footer>
    </>
  );
}