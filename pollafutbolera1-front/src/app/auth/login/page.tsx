"use client";
import * as React from "react";
import FormLogin from "@/src/components/formLogin";
import Footer from "@/src/components/layout/Footer";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center self-center px-16 pt-3 pb-10 my-8 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-[600px] max-md:px-5 max-md:mt-10">
          <div className="flex flex-col justify-center items-center w-full mb-2">
            <div className="w-36 h-36 relative mb-2">
              <Image
                src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
                alt="Logo Popoya"
                width={150}
                height={150}
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Iniciar sesión</h1>
          </div>
          <FormLogin />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;