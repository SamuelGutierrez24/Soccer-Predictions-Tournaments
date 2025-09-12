'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminSidebar from '@/src/components/layout/SidebarAdmin';
import ListPreloadUser from '@/src/components/user/ListPreloadUser';
import Navbar from '@/src/components/layout/Navbar';

function PreLoadUserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pollaId = searchParams.get('pollaId');

  const handleGoBack = () => {
    if (pollaId) {
      router.push(`/admin/${pollaId}/participantes`);
    } else {
      router.push('/admin');
    }
  };

  return (
<div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        {pollaId && <AdminSidebar pollaId={pollaId} />}
        <main className="flex-1">
          <div className="container mx-auto px-10 py-10">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de usuarios precargados</h1>
                <button
                  onClick={handleGoBack}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <span>←</span>
                  Regresar
                </button>
              </div>
              <Suspense fallback={<div>Cargando...</div>}>
                <ListPreloadUser />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PreLoadUserPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PreLoadUserContent />
    </Suspense>
  );
}
