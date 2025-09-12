"use client";
import * as React from "react";
import { ConfigurationForm } from "../../../components/configuration/ConfigurationForm";
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

export default function PollaConfiguration() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4 md:px-8">
        
        <div className="bg-white rounded-lg shadow-md">
          <ConfigurationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

