"use client";
import * as React from "react";
import { PollaEditForm } from "../../../../components/polla/PollaEditForm";
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { useParams } from "next/navigation";

export default function PollaEditPage() {
  // Use the useParams hook to get the params
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md">
          <PollaEditForm pollaId={id} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 