"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { ProgressSteps } from "../nav/ProgressSteps";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/src/hooks/auth/useSignUp";
import toast from "react-hot-toast";
import { personalInfoSchema, credentialsSchema, contactInfoSchema } from "@/src/schemas";
import { useImageUpload } from "@/src/hooks/auth/useImageUpload";
import { PageHeader } from "@/src/components/profile/PageHeader";
import { usePreloadedForm } from "@/src/hooks/auth/usePreloadedForm";
import { useRelationScorePolla } from "@/src/hooks/auth/useRelationScorePolla";

interface SignUpFormProps {
    id: string;
}

export function SignUpForm({id} : SignUpFormProps) {

  const { imageUpload } = useImageUpload();
  const { signUp } = useSignUp();
  const { createRelation } = useRelationScorePolla();

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { user } = usePreloadedForm(id);

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        cedula: user.cedula,
        firstName: user.name,
        lastName: user.lastName,
      });

      setContactInfo({
        email: user.mail,
        phone: user.phonenumber
      });
    }
  }, [user]);
  
  const [personalInfo, setPersonalInfo] = useState({
    cedula: "",
    firstName: "",
    lastName: "",
  });
  
  const [credentials, setCredentials] = useState({
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  
  const [photoInfo, setPhotoInfo] = useState({
    profilePhoto: null as File | null,
  });
  
  const [personalInfoErrors, setPersonalInfoErrors] = useState({
    cedula: "",
    firstName: "",
    lastName: "",
  });
  
  const [credentialsErrors, setCredentialsErrors] = useState({
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  
  const [contactInfoErrors, setContactInfoErrors] = useState({
    email: "",
    phone: "",
  });

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleExceptions = (error: any) => {
    switch (error) {
      case "INSECURE_PASSWORD": return "La contraseña no es segura. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
      case "ALREADY_EXISTS": return "El usuario con la cédula escrita ya existe.";
      case "CEDULA_LENGTH": return "La cédula debe tener 10 dígitos.";
      case "PHONE_FORMAT": return "El formato del teléfono es incorrecto.";
      case "EMAIL_FORMAT": return "El formato del correo electrónico es incorrecto.";
      case "BAD_REQUEST": return "La solicitud es incorrecta.";
      case "EMAIL_SEND_ERROR": return "Error al enviar el correo electrónico.";    
    }
  }

  const validateStep = () => {
    if (currentStep === 1) {

      const result = personalInfoSchema.safeParse(personalInfo);
      
      if (!result.success) {
        const formattedErrors = result.error.format();
        
        setPersonalInfoErrors({
          cedula: formattedErrors.cedula?._errors[0] || "",
          firstName: formattedErrors.firstName?._errors[0] || "",
          lastName: formattedErrors.lastName?._errors[0] || "",
        });
        
        return false;
      }
      
      setPersonalInfoErrors({ cedula: "", firstName: "", lastName: "" });
      return true;
    }

    if (currentStep === 2) {
      
      const result = credentialsSchema.safeParse(credentials);
      
      if (!result.success) {
        const formattedErrors = result.error.format();
        
        setCredentialsErrors({
          nickname: formattedErrors.nickname?._errors[0] || "",
          password: formattedErrors.password?._errors[0] || "",
          confirmPassword: formattedErrors.confirmPassword?._errors[0] || "",
        });
        
        return false;
      }
      
      setCredentialsErrors({ nickname: "", password: "", confirmPassword: "" });
      return true;
    }

    if (currentStep === 3) {

      const result = contactInfoSchema.safeParse(contactInfo);
      
      if (!result.success) {
        const formattedErrors = result.error.format();
        
        setContactInfoErrors({
          email: formattedErrors.email?._errors[0] || "",
          phone: formattedErrors.phone?._errors[0] || "",        });
        
        const errorMessages = result.error.errors.map(err => err.message).join('\n');
        toast.error(errorMessages);
        
        return false;
      }
      
      setContactInfoErrors({ email: "", phone: "" });
      return true;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      // Combine all form data - validation is now done per step
      const userData = {
        ...personalInfo,
        ...credentials,
        ...contactInfo,
        profilePhoto: photoInfo.profilePhoto,
      };
  
      // Handle image upload first, separately from the rest of the logic
      let imageUrl: string | null = null;
      if (photoInfo.profilePhoto) {
        try {
          imageUrl = await imageUpload(photoInfo.profilePhoto);        } catch {
          toast.error('Error al subir la imagen de perfil');
          return;
        }
      }else{
        imageUrl = "https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
      }
  
      // Only execute signUp if we made it past the image upload
      const response = await signUp({
        ...userData,
        imageUrl: imageUrl,
      });      if (response?.error) {
        toast.error(typeof response.error === 'string' ? response.error : 'Ha ocurrido un error en el registro');
      } else {
        if (response?.status != "CREATED") {
          toast.error(handleExceptions(response.body) || 'Ha ocurrido un error desconocido');
        }else{
          if(user){
            const userId= response.body.id; 
            const pollaId= user?.pollaId;
            console.log(userId)
            const responseRelation = await createRelation(userId, pollaId.toString());

            if (responseRelation){
                toast.success('Registro Exitoso');
            }
          }
          
          toast.success('Registro exitoso');
          
          // Redirect after successful registration
          
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);

        }
        
      }    } catch (error) {
      console.error("Error registering user:", error);
      toast.error('Hubo un error inesperado al registrar el usuario');
    }
  };

  const handleCancel = () => {
    router.push('/auth/login');
  };
  return (
    <main className="flex flex-col px-14 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <PageHeader
        title="Registro" 
        onBack={handleCancel} 
      />

      <section className="flex flex-col items-center self-center px-16 pt-3 pb-10 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-[768px] max-md:px-5 max-md:mt-10">
        <ProgressSteps currentStep={currentStep} steps={4}/>

        {currentStep === 1 && (
          <Step1
            formData={personalInfo}
            setFormData={setPersonalInfo}
            errors={personalInfoErrors}
            setErrors={setPersonalInfoErrors}
          />
        )}

        {currentStep === 2 && (
          <Step2
            formData={credentials}
            setFormData={setCredentials}
            errors={credentialsErrors}
            setErrors={setCredentialsErrors}
          />
        )}

        {currentStep === 3 && (
          <Step3
            formData={contactInfo}
            setFormData={setContactInfo}
            errors={contactInfoErrors}
            setErrors={setContactInfoErrors}
          />
        )}

        {currentStep === 4 && (
          <Step4
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
          onClick={currentStep === 4 ? handleSubmit : handleNext}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-[46px] hover:bg-blue-700"
        >
          {currentStep === 4 ? "Registrarse" : "Siguiente"}
        </button>
      </div>
    </main>
  );
}