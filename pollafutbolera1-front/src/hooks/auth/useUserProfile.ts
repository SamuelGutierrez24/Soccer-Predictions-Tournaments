import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthorizationHeader } from "@/src/apis/getAuthorizationHeader";

export interface UserProfile {
  id: number;
  name: string;
  nickname: string;
  mail: string;
  photo?: string;
  role: number;
  lastName?: string;
}

export function useUserProfile(userId?: string | number) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/pollafutbolera"}/user/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => setProfile(res.data))
      .catch((err) => setError("No se pudo cargar el perfil"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, loading, error };
}
