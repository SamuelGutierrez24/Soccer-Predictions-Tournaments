'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "@/src/components/layout/Footer";
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
});

export default function Error403() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // timer puede ser undefined o un identificador válido
    let timer: ReturnType<typeof setInterval> | undefined

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1)
      }, 1000)
    }

    return () => {
      if (timer !== undefined) {
        clearInterval(timer)
      }
    }
  }, [countdown])

  // Función para borrar la cookie currentUser
  const clearCurrentUserCookie = () => {
    document.cookie = 'currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <>
      <Head>
        <title>Acceso No Autorizado | DBBETZ</title>
        <meta name="description" content="No tienes acceso a esta página" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 ">

        {/* Main Content */}
        <main className= {`${dmSans.className} flex-grow flex flex-col items-center justify-center px-4 my-30`}>
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 p-4">
                  <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">Error 403</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Acceso No Autorizado</h2>
            
            <div className="mb-8">
              <p className="text-gray-600 text-lg mb-4">
                Lo sentimos, no tienes permiso para acceder a esta página.
              </p>
              <p className="text-gray-600">
                Por favor, inicia sesión o contacta con nuestro equipo de soporte si crees que esto es un error.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
              <Link href="/" onClick={clearCurrentUserCookie}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Volver al Inicio
                </button>
              </Link>
              <Link href="/auth/login" onClick={clearCurrentUserCookie}>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                    />
                  </svg>
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          </div>
        </main>

        {/* Background Stadium Effect */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/stadium-bg.jpg')" }}></div>
        </div>

        <Footer />
      </div>
    </>
  );
}