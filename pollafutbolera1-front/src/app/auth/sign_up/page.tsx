"use client";
import * as React from "react";
import { SignUpForm } from "../../../components/auth/SignUpForm";
import Footer from "../../../components/layout/Footer";

export default function PollaConfiguration() {
  return (
    <>
    <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
      <SignUpForm id=""/>
    </div>
    <Footer/>
    </>
  );
}