import React from "react";

interface Step1Props {
  formData: {
    cedula: string;
    firstName: string;
    lastName: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      cedula: string;
      firstName: string;
      lastName: string;
    }>
  >;
  errors: {
    cedula: string;
    firstName: string;
    lastName: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      cedula: string;
      firstName: string;
      lastName: string;
    }>
  >;
}

export function Step1({ formData, setFormData, errors, setErrors }: Step1Props) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  };

  // CSS for animated error messages
  const errorStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Información Personal
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Por favor ingresa tus datos personales
      </p>
      
      <div className="self-start w-full mt-8">
        <label className="text-lg font-semibold text-black">Cédula</label>
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleInputChange}
          placeholder="Ingresa tu número de identificación"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.cedula ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.cedula && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.cedula}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Nombre</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Ingresa tu nombre"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.firstName ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.firstName && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.firstName}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Ingresa tu apellido"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.lastName ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.lastName && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.lastName}
          </p>
        )}
      </div>
    </div>
  );
}