import React from "react";

interface CompanyDataStepProps {
  formData: {
    name: string;
    nit: string;
    address: string | null;
    contact: string | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      nit: string;
      address: string | null;
      contact: string | null;
    }>
  >;
  errors: {
    name: string;
    nit: string;
    address: string;
    contact: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      name: string;
      nit: string;
      address: string;
      contact: string;
    }>
  >;
}

export function CompanyDataStep({ formData, setFormData, errors, setErrors }: CompanyDataStepProps) {
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

  const errorStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Datos de la Empresa
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Por favor ingresa los datos de la empresa
      </p>
      
      <div className="self-start w-full mt-8">
        <label className="text-lg font-semibold text-black">Nombre de la Empresa *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ingresa el nombre de la empresa"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.name ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.name && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.name}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">NIT *</label>
        <input
          type="text"
          name="nit"
          value={formData.nit}
          onChange={handleInputChange}
          placeholder="Ingresa el NIT de la empresa"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.nit ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.nit && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.nit}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Dirección</label>
        <input
          type="text"
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          placeholder="Ingresa la dirección de la empresa (opcional)"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.address ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.address && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.address}
          </p>
        )}
      </div>
      
      <div className="self-start w-full mt-6">
        <label className="text-lg font-semibold text-black">Contacto</label>
        <input
          type="text"
          name="contact"
          value={formData.contact || ''}
          onChange={handleInputChange}
          placeholder="Ingresa un contacto (opcional)"
          className={`flex shrink-0 w-full mt-2 bg-white text-black border border-solid shadow-sm ${
            errors.contact ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
          } h-[66px] rounded-[46px] p-4`}
        />
        {errors.contact && (
          <p 
            className="text-red-500 mt-1 animate-error-in" 
            style={errorStyle}
          >
            {errors.contact}
          </p>
        )}
      </div>
    </div>
  );
}