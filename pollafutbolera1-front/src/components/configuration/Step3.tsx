import React from "react";
import { UploadArea } from "../inputs/UploadArea";

interface Step3Props {
  formData: {
    firstPrizeTitle: string;
    firstPrizeDescription: string;
    secondPrizeTitle: string;
    secondPrizeDescription: string;
    thirdPrizeTitle: string;
    thirdPrizeDescription: string;
    firstPrizeFile: File | null;
    secondPrizeFile: File | null;
    thirdPrizeFile: File | null;
    firstPrizeImageUrl: string;
    secondPrizeImageUrl: string;
    thirdPrizeImageUrl: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      firstPrizeTitle: string;
      firstPrizeDescription: string;
      secondPrizeTitle: string;
      secondPrizeDescription: string;
      thirdPrizeTitle: string;
      thirdPrizeDescription: string;
      firstPrizeFile: File | null;
      secondPrizeFile: File | null;
      thirdPrizeFile: File | null;
      firstPrizeImageUrl: string;
      secondPrizeImageUrl: string;
      thirdPrizeImageUrl: string;
    }>
  >;
  errors: {
    firstPrizeTitle: string;
    firstPrizeDescription: string;
    secondPrizeTitle: string;
    secondPrizeDescription: string;
    thirdPrizeTitle: string;
    thirdPrizeDescription: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      firstPrizeTitle: string;
      firstPrizeDescription: string;
      secondPrizeTitle: string;
      secondPrizeDescription: string;
      thirdPrizeTitle: string;
      thirdPrizeDescription: string;
    }>
  >;
}

export function Step3({ formData, setFormData, errors, setErrors }: Step3Props) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: file,
    }));
  };

  const prizes = [
    { 
      title: "firstPrizeTitle", 
      description: "firstPrizeDescription", 
      file: "firstPrizeFile", 
      imageUrl: "firstPrizeImageUrl",
      label: "primer puesto" 
    },
    { 
      title: "secondPrizeTitle", 
      description: "secondPrizeDescription", 
      file: "secondPrizeFile", 
      imageUrl: "secondPrizeImageUrl",
      label: "segundo puesto" 
    },
    { 
      title: "thirdPrizeTitle", 
      description: "thirdPrizeDescription", 
      file: "thirdPrizeFile", 
      imageUrl: "thirdPrizeImageUrl",
      label: "tercer puesto" 
    },
  ];

  return (
    <div className="flex flex-col w-full justifyitems-center">
      {prizes.map((prize, index) => (
        <React.Fragment key={index}>
          <h2 className="self-center mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
            Premio {prize.label}
          </h2>
          <p className="self-center mt-2 text-lg leading-none text-black">
            Ingrese información del premio para el {prize.label}
          </p>
          <div className="flex flex-col md:flex-row justify-between mt-7 w-full">
            <div className="w-full md:w-[48%] mb-4 md:mb-0">
              <input
                type="text"
                name={prize.title}
                value={formData[prize.title as keyof typeof formData] as string}
                onChange={handleInputChange}
                placeholder="Título"
                className={`flex shrink-0 bg-white text-black border border-solid shadow-sm ${
                  errors[prize.title as keyof typeof errors] ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
                } h-[66px] rounded-[46px] w-full p-4`}
              />
              {errors[prize.title as keyof typeof errors] && (
                <p className="text-red-500 mt-1 ml-4">{errors[prize.title as keyof typeof errors]}</p>
              )}
            </div>
            <div className="w-full md:w-[48%]">
            <input
                type="text"
                name={prize.description}
                value={formData[prize.description as keyof typeof formData] as string}
                onChange={handleInputChange}
                placeholder="Descripción"
                className={`flex shrink-0 bg-white text-black border border-solid shadow-sm ${
                  errors[prize.description as keyof typeof errors] ? "border-red-500" : "border-[color:var(--Neutral-300,#EFF0F6)]"
                } h-[66px] rounded-[46px] w-full p-4`}
              />
              {errors[prize.description as keyof typeof errors] && (
                <p className="text-red-500 mt-1 ml-4">{errors[prize.description as keyof typeof errors]}</p>
              )}
            </div>
          </div>
          <div className="self-center w-full mt-5">
            <UploadArea
              file={formData[prize.file as keyof typeof formData] as File | null}
              setFile={(file) => handleFileChange(prize.file, file)}
              existingImageUrl={formData[prize.imageUrl as keyof typeof formData] as string}
            />
          </div>
          {index < prizes.length - 1 && (
            <div className="shrink-0 mt-7 h-0.5 bg-black w-full" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
