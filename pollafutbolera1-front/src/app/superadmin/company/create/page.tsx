"use client";
import * as React from "react";
//import { SignUpForm } from "../../../components/auth/SignUpForm";
import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";
import { CreateCompanyForm } from "@/src/components/company/create-company/CreateCompanyForm";

export default function CreateCompany() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
          <div className="w-full max-w-4xl">
            <CreateCompanyForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}