import React from "react";
import { UploadArea } from "../inputs/UploadArea";

interface Step4Props {
  formData: {
    profilePhoto: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      profilePhoto: File | null;
    }>
  >;
}

export function Step4({ formData, setFormData }: Step4Props) {
  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: file,
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Foto de Perfil
      </h2>
      <p className="self-center mt-3 text-lg text-black">
        Sube una foto para tu perfil
      </p>
      <div className="self-center w-full mt-8">
        <UploadArea
          file={formData.profilePhoto}
          setFile={handleFileChange}
          maxSizeMB={2} // Set a 2MB limit, for example
        />
      </div>
      <p className="self-center mt-2 text-sm text-gray-500">
        Tamaño máximo: 2MB. Formatos aceptados: JPG, PNG, GIF.
      </p>
    </div>
  );
}