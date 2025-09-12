"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreateCompanySchema } from "@/src/schemas/company";
import { ProgressSteps } from "../../nav/ProgressSteps";
import { CompanyDataStep } from "./CompanyDataStep";
import { AdminSelectionStep } from "./AdminSelectionStep";
import { companyApi } from "@/src/apis";
import axios from 'axios';
import { UploadPhotoStep } from "./UploadPhotoStep";
import { useImageUpload } from "@/src/hooks/auth/useImageUpload";

export function CreateCompanyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { imageUpload } = useImageUpload();
  const router = useRouter();
  
  const [companyData, setCompanyData] = useState({
    name: "",
    nit: "",
    address: null as string | null,
    contact: null as string | null
  });
  
  const [adminId, setAdminId] = useState<number | null>(null);
  
  const [companyErrors, setCompanyErrors] = useState({
    name: "",
    nit: "",
    address: "",
    contact: ""
  });

  const [photoInfo, setPhotoInfo] = useState({
      profilePhoto: null as File | null,
  });

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      const result = CreateCompanySchema.safeParse(companyData);
      
      if (!result.success) {
        const formattedErrors = result.error.format();
        
        setCompanyErrors({
          name: formattedErrors.name?._errors[0] || "",
          nit: formattedErrors.nit?._errors[0] || "",
          address: formattedErrors.address?._errors[0] || "",
          contact: formattedErrors.contact?._errors[0] || "",
        });
        
        return false;
      }
      
      setCompanyErrors({ name: "", nit: "", address: "", contact: "" });
      return true;
    }
    if (currentStep === 2) {
      if (!adminId) {
        toast.error('Debes seleccionar un administrador para la empresa');
        return false;
      }

    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      

      let logoUrl: string | null = null;
      if (photoInfo.profilePhoto) {
        try {
          logoUrl = await imageUpload(photoInfo.profilePhoto);        } catch {
          toast.error('Error al subir el logo');
          return;
        }
      }else{
        logoUrl = "https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
      }

      if(!logoUrl) return
      if (!adminId) return
      
      const response = await companyApi.createCompany({
        companyDTO: {
          name: companyData.name,
          nit: companyData.nit,
          address: companyData.address || undefined, // Envía undefined si es null
          contact: companyData.contact || undefined,
          logo: logoUrl
        },
        companyAdminId: adminId      });

      toast.success('Empresa creada exitosamente');
      
      setTimeout(() => {
        router.push('/superadmin/home');
      }, 3000);
      
    } catch (error) {

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error('El Nit de la empresa ya esta registrado');
          return;
        }
      }

      toast.error('Hubo un error inesperado al crear la empresa');
    }
  };
  return (
    <main className="flex flex-col px-14 max-md:px-5 max-md:mt-10 max-md:max-w-full">

      <section className="flex flex-col items-center self-center px-16 pt-3 pb-10 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-[768px] max-md:px-5 max-md:mt-10">
        <ProgressSteps currentStep={currentStep} steps={3}/>

        {currentStep === 1 && (
          <CompanyDataStep
            formData={companyData}
            setFormData={setCompanyData}
            errors={companyErrors}
            setErrors={setCompanyErrors}
          />
        )}

        {currentStep === 2 && (
          <AdminSelectionStep
            adminId={adminId}
            setAdminId={setAdminId}
          />
        )}

        {currentStep === 3 && (
          <UploadPhotoStep
            formData={photoInfo}
            setFormData={setPhotoInfo}
          />
        )}

      </section>

      <div className="flex justify-between w-full mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-8 py-3 text-white font-semibold rounded-[46px] ${
            currentStep === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Anterior
        </button>
        
        <button
          onClick={currentStep === 3 ? handleSubmit : handleNext}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-[46px] hover:bg-blue-700"
        >
          {currentStep === 3 ? "Crear Empresa" : "Siguiente"}
        </button>
      </div>
    </main>
  );
}