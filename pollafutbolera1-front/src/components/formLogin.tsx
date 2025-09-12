"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/auth/useLogin";
import Cookies from "js-cookie";
import PasswordResetPopup from "./PasswordResetPopup";
import toast from "react-hot-toast";

const FormLogin = () => {
  const [isPending, setIsPending] = useTransition();
  const { login } = useLogin();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();    const values = {
      nickname: event.currentTarget.nickname.value,
      password: event.currentTarget.password.value,
    };

    setIsPending(() => {  
      login(values.nickname, values.password).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        const currentUser = Cookies.get("currentUser");
        const role = currentUser
          ? JSON.parse(currentUser).role.name
          : currentUser
          ? JSON.parse(String(currentUser)).role.name
          : null;
        if (role === "SUPERADMIN") {
          router.push("/superadmin/home");
        } else if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      });
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col w-full">
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de usuario
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
            required
          />
        </div>

        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 text-sm self-end mb-4"
          onClick={() => setShowPopup(true)}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {showPopup && <PasswordResetPopup onClose={() => setShowPopup(false)} />}

        <div className="flex flex-col gap-3 mt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full"
            disabled={isPending}
          >
            Iniciar sesión
          </button>
          
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors w-full"
            disabled={isPending}
            onClick={() => router.push("/auth/sign_up")}
          >
            Registrate
          </button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;