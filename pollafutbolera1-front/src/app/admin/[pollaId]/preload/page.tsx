"use client";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Navbar";
import { FileUploadSection } from "@/src/components/inputs/SelectFile";

export default function Page() {
  return (
    <div className="container mx-auto px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Precarga de Usuarios</h1>
      <FileUploadSection />
    </div>
  );
}
