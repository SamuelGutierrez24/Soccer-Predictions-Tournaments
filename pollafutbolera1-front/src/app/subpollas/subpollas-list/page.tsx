"use client";
import React from "react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { SubPollasList } from "../../../components/subpollas/SubPollasList";

export default function SubPollasListPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SubPollasList />
      </main>
      <Footer />
    </div>
  );
}
