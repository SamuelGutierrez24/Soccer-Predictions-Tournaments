"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/src/hooks/auth/useProfile";
import { useImageUpload } from "@/src/hooks/auth/useImageUpload";
import { useNickNameExists } from "@/src/hooks/auth/useNickNameExists";
import Cookies from "js-cookie";
import { personalInfoSchema, contactInfoSchema } from "@/src/schemas";
import Footer from "@/src/components/layout/Footer";

// Import the new components
import { ProfilePhotoUpload } from "@/src/components/profile/ProfilePhotoUpload";
import { PersonalInfoForm } from "@/src/components/profile/PersonalInfoForm";
import { ContactInfoForm } from "@/src/components/profile/ContactInfoForm";
import { AlertNotification } from "@/src/components/ui/AlertNotification";
import { ProfileFormButtons } from "@/src/components/profile/ProfileFormButtons";
import { PageHeader } from "@/src/components/profile/PageHeader";

export default function EditProfilePage() {
  const router = useRouter();
  const { getMyProfile, updateProfile } = useProfile();
  const { imageUpload } = useImageUpload();
  const { imageDelete } = useImageUpload();
  const { getPublicId } = useImageUpload();
  const { alreadyExists } = useNickNameExists();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [originalNickname, setOriginalNickname] = useState("");

  const [profileData, setProfileData] = useState({
    photo: "",
    cedula: "",
    firstName: "",
    lastName: "",
    mail: "",
    phoneNumber: "",
    nickname: "",
  });

  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    cedula: "",
    firstName: "",
    lastName: "",
    mail: "",
    phoneNumber: "",
    nickname: "",
  });

  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'info' | 'warning'; 
    message: string;
    open: boolean;
  }>({
    type: 'info',
    message: '',
    open: false
  });

  useEffect(() => {
    // Check if JWT is available
    const jwt = Cookies.get("currentUser");
    if (!jwt) {
      router.push("/auth/login");
      return;
    }

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile(JSON.parse(jwt).accessToken);
        if (profile.error) {
          console.error(profile.error);
          router.push("/auth/login");
        } else {
          setProfileData({
            photo: profile.photo,
            cedula: profile.cedula,
            firstName: profile.name,
            lastName: profile.lastName,
            mail: profile.mail,
            phoneNumber: profile.phoneNumber,
            nickname: profile.nickname,
          });
          setOriginalNickname(profile.nickname); // Store original nickname for comparison
          setPreviewUrl(profile.photo);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // If it's the nickname field, check availability with debounce
    if (name === "nickname" && value.length > 2 && value !== originalNickname) {
      // Clear previous timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setIsCheckingNickname(true);
      
      // Set new timeout to check nickname after 500ms of no typing
      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await alreadyExists(value);
          
          setNicknameAvailable(!result);
          
          if (result) {
            setErrors(prev => ({
              ...prev,
              nickname: "Este nickname ya está en uso",
            }));
          } else {
            setErrors(prev => ({
              ...prev,
              nickname: "",
            }));
          }
        } catch (error) {
          console.error("Failed to check nickname availability:", error);
        }
        setIsCheckingNickname(false);
      }, 500);
    } else if (name === "nickname" && (value.length <= 2 || value === originalNickname)) {
      // Reset when nickname is too short or is the original
      setNicknameAvailable(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsCheckingNickname(false);
      
      // If it's the original nickname, it's always valid
      if (value === originalNickname) {
        setErrors(prev => ({ ...prev, nickname: "" }));
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPhotoFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Validate nickname separately
    if (profileData.nickname !== originalNickname && errors.nickname) {
      return false;
    }
    
    // Validate personal info using the schema
    const personalResult = personalInfoSchema.safeParse({
      cedula: profileData.cedula,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    });

    // Validate contact info using the schema
    const contactResult = contactInfoSchema.safeParse({
      email: profileData.mail,
      phone: profileData.phoneNumber,
    });

    // Handle personal info validation errors
    if (!personalResult.success) {
      const formattedErrors = personalResult.error.format();
      setErrors(prev => ({
        ...prev,
        firstName: formattedErrors.firstName?._errors[0] || "",
        lastName: formattedErrors.lastName?._errors[0] || "",
      }));
      return false;
    }

    // Handle contact info validation errors
    if (!contactResult.success) {
      const formattedErrors = contactResult.error.format();
      setErrors(prev => ({
        ...prev,
        mail: formattedErrors.email?._errors[0] || "",
        phoneNumber: formattedErrors.phone?._errors[0] || "",
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({
        type: 'error',
        message: 'Por favor, corrija los errores en el formulario',
        open: true
      });
      return;
    }
    
    // If nickname was changed, check if it's available
    if (profileData.nickname !== originalNickname && nicknameAvailable !== true) {
      setAlert({
        type: 'error',
        message: 'El nickname no está disponible o no ha sido validado',
        open: true
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Handle image upload if there's a new photo
      let imageUrl = profileData.photo;
      if (newPhotoFile) {
        try {
          imageUrl = await imageUpload(newPhotoFile);
          // Delete the old image if a new one is uploaded and is not the default image
          if (profileData.photo && profileData.photo !== imageUrl && profileData.photo !== "https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png") {
            const jwt = Cookies.get("currentUser") || "";
            await getPublicId(profileData.photo, JSON.parse(jwt).accessToken).then(async (res) => {
              await imageDelete(res, JSON.parse(jwt).accessToken)
            }).catch((err) => {
              console.error("Error deleting old image:", err);
              setAlert({
                type: 'error',
                message: 'Error al eliminar la imagen anterior',
                open: true
              });
              setIsSubmitting(false);
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          setAlert({
            type: 'error',
            message: 'Error al subir la imagen de perfil',
            open: true
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Get JWT
      const jwt = Cookies.get("currentUser");
      if (!jwt) {
        router.push("/auth/login");
        return;
      }

      // Prepare data for update
      const updateData = {
        name: profileData.firstName,
        lastName: profileData.lastName,
        mail: profileData.mail,
        nickname: profileData.nickname,
        phoneNumber: profileData.phoneNumber,
        photo: imageUrl
      };

      // Call update profile API
      const result = await updateProfile(JSON.parse(jwt).accessToken, updateData);
      
      if (result.error) {
        setAlert({
          type: 'error',
          message: typeof result.error === 'string' ? result.error : 'Ha ocurrido un error actualizando el perfil',
          open: true
        });
      } else {
        setAlert({
          type: 'success',
          message: 'Perfil actualizado correctamente',
          open: true
        });
        //result is the new access token
        JSON.parse(jwt).accessToken = result.accessToken;
        Cookies.set("currentUser", JSON.stringify({ ...JSON.parse(jwt), accessToken: result.accessToken }), { expires: 1 });

        // Redirect to profile page after 2 seconds
        setTimeout(() => {
          router.push('/user/profile');
        }, 2000);
        
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({
        type: 'error',
        message: 'Hubo un error inesperado al actualizar el perfil',
        open: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/user/profile');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center py-10">
        <main className="flex flex-col px-8 py-8 max-w-4xl w-full">
          <PageHeader 
            title="Editar Perfil" 
            onBack={handleCancel} 
          />

          <AlertNotification 
            type={alert.type}
            message={alert.message}
            open={alert.open}
            onClose={() => setAlert(prev => ({...prev, open: false}))}
          />

          <form onSubmit={handleSubmit} className="flex flex-col items-center self-center px-8 pt-8 pb-10 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-full">
            <ProfilePhotoUpload 
              previewUrl={previewUrl} 
              onPhotoChange={handlePhotoChange}
            />

            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <PersonalInfoForm 
                profileData={{
                  cedula: profileData.cedula,
                  firstName: profileData.firstName,
                  lastName: profileData.lastName,
                  nickname: profileData.nickname
                }}
                errors={{
                  firstName: errors.firstName,
                  lastName: errors.lastName,
                  nickname: errors.nickname
                }}
                isCheckingNickname={isCheckingNickname}
                nicknameAvailable={nicknameAvailable}
                handleInputChange={handleInputChange}
              />

              <ContactInfoForm 
                profileData={{
                  mail: profileData.mail,
                  phoneNumber: profileData.phoneNumber
                }}
                errors={{
                  mail: errors.mail,
                  phoneNumber: errors.phoneNumber
                }}
                handleInputChange={handleInputChange}
              />
            </div>

            <ProfileFormButtons 
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
            />
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}