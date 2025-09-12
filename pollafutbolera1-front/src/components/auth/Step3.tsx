import React from "react";

interface Step3Props {
  formData: {
    email: string;
    phone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      phone: string;
    }>
  >;
  errors: {
    email: string;
    phone: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: string;
      phone: string;
    }>
  >;
}

export function Step3({ formData, setFormData, errors, setErrors }: Step3Props) {
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
        Información de Contacto
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Por favor ingresa tus datos de contacto
      </p>
      
      <div className="self-start w-full mt-8">
        <label className="text-lg font-semibold text-black">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Ingresa tu correo electrónico"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.email ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.email && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.email}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Número de teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Ingresa tu número de teléfono"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.phone ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.phone && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.phone}
          </p>
        )}
      </div>
    </div>
  );
}