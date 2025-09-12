import React, { useState, useEffect, useRef } from "react";
import { useNickNameExists } from "@/src/hooks/auth/useNickNameExists";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Step2Props {
  formData: {
    nickname: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      nickname: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  errors: {
    nickname: string;
    password: string;
    confirmPassword: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      nickname: string;
      password: string;
      confirmPassword: string;
    }>
  >;
}

export function Step2({ formData, setFormData, errors, setErrors }: Step2Props) {
  const { alreadyExists } = useNickNameExists();
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    
    // If it's the nickname field, check availability with debounce
    if (name === "nickname" && value.length > 2) {
      // Clear previous timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setIsCheckingNickname(true);
      
      // Set new timeout to check nickname after 500ms of no typing
      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await alreadyExists(value);
          
          if (result) {
            setNicknameAvailable(!result);
              
            if (result) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                nickname: "Este nickname ya está en uso",
              }));
            }
          }else if (!result) {
            setNicknameAvailable(!result);
            setErrors((prevErrors) => ({
              ...prevErrors,
              nickname: "",
            }));
          }
        } catch (error) {
          console.error("Failed to check nickname availability:", error);
        }
        setIsCheckingNickname(false);
      }, 500);
    } else if (name === "nickname" && value.length <= 2) {
      // Reset when nickname is too short to check
      setNicknameAvailable(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsCheckingNickname(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Check nickname when component mounts if nickname already has a value
  useEffect(() => {
    if (formData.nickname.length > 2) {
      handleInputChange({
        target: { name: "nickname", value: formData.nickname }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

  const errorStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Credenciales
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Crea tus credenciales de acceso
      </p>
      
      <div className="self-start w-full mt-8">
        <label className="text-lg font-semibold text-black">Nickname</label>
        <div className="relative w-full">
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="Escoge un nickname único"
            className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
              errors.nickname 
                ? "border-red-500" 
                : nicknameAvailable === true 
                  ? "border-green-500" 
                  : "border-[color:var(--Neutral-300,#EFF0F6)]"
            } h-[66px] rounded-[46px] p-4`}
          />
          {isCheckingNickname && (
            <div className="absolute right-4 top-[50%] transform -translate-y-[30%]">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
          {!isCheckingNickname && nicknameAvailable && formData.nickname.length > 2 && (
            <CheckIcon
              className="absolute right-4 top-[50%] transform -translate-y-[30%] text-green-500"
              style={errorStyle}
            />
          )}
          {!isCheckingNickname && !nicknameAvailable && formData.nickname.length > 2 && (
            <CloseIcon
              className="absolute right-4 top-[50%] transform -translate-y-[30%] text-red-500"
              style={errorStyle}
            />
          )}
        </div>
        {errors.nickname && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.nickname}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Crea una contraseña segura"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.password ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.password && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.password}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirma tu contraseña"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.confirmPassword ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.confirmPassword && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
}