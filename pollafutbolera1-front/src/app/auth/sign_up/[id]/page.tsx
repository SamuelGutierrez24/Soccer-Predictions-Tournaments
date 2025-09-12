"use client";
import { SignUpForm } from "@/src/components/auth/SignUpForm";
import { useParams } from "next/navigation";


export default function FormPreloaded() {
  const { id } = useParams() as { id?: string }
  return (
    <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
      <SignUpForm id={id!} />
    </div>
  );
}