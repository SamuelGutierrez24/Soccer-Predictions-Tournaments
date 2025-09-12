import React, { useEffect, useRef } from "react";
import { UploadArea } from "../inputs/UploadArea";
import { ColorPicker } from "../inputs/ColorPicker";
import { TournamentDTO } from "../../interfaces/tournamentDTO.interface";

interface Step1Props {
  formData: {
    additionalRules: string;
    visibility: string;
    startDate: string;
    endDate: string;
    color: string;
    logoFile: File | null;
    logoUrl: string;
    tournamentId: number | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      additionalRules: string;
      visibility: string;
      startDate: string;
      endDate: string;
      color: string;
      logoFile: File | null;
      logoUrl: string;
      tournamentId: number | null;
    }>
  >;
  errors: {
    startDate: string;
    endDate: string;
    tournamentId: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
      tournamentId: string;
    }>
  >;
  tournaments: TournamentDTO[];
  loadingTournaments: boolean;
  isEdit?: boolean;
}

export function Step1({ formData, setFormData, errors, setErrors, tournaments, loadingTournaments, isEdit = false }: Step1Props) {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
  }, [formData]);
  
  // Use effect to directly set values on the inputs if needed
  useEffect(() => {
    if (startDateRef.current && formData.startDate) {
      startDateRef.current.value = formData.startDate;
    }
    
    if (endDateRef.current && formData.endDate) {
      endDateRef.current.value = formData.endDate;
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'tournamentId' ? (value ? parseInt(value) : null) : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleColorChange = (color: string) => {
    setFormData((prevData) => ({
      ...prevData,
      color,
    }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="self-start mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Datos de la polla
      </h2>
      <label className="self-start mt-9 text-lg font-semibold leading-none text-black">
        Logo de la Polla Personalizada
      </label>
      <div className="self-center w-full mt-5">
        <UploadArea
          file={formData.logoFile}
          setFile={(file) => handleFileChange("logoFile", file)}
          existingImageUrl={formData.logoUrl}
        />
      </div>
      <label className="self-start mt-12 text-lg font-semibold leading-none text-black max-md:mt-10">
        Color Polla Personalizada
      </label>
      <div className="self-start w-full mt-5">
        <ColorPicker onChange={handleColorChange} value={formData.color} />
      </div>

      <label className="self-start mt-10 text-lg font-semibold leading-none text-black">
        Torneo asociado
      </label>
      <select
        name="tournamentId"
        value={formData.tournamentId || ""}
        onChange={handleInputChange}
        disabled={loadingTournaments}
        className="flex shrink-0 self-start mt-5 max-w-full bg-white text-black border border-solid shadow-sm border-[color:var(--Neutral-300,#EFF0F6)] h-[66px] rounded-[46px] w-[600px] p-4"
      >
        <option value="">
          {loadingTournaments ? "Cargando torneos..." : "Selecciona un torneo"}
        </option>
        {tournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </select>
      {errors.tournamentId && <p className="text-red-500">{errors.tournamentId}</p>}

      <label className="self-start mt-10 text-lg font-semibold leading-none text-black">
        Visibilidad de la polla
      </label>
      <div className="self-start mt-5">
        <input
          type="radio"
          id="public"
          name="visibility"
          value="public"
          checked={formData.visibility === "public"}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label htmlFor="public" className="mr-5 text-black">
          Pública
        </label>
        <input
          type="radio"
          id="private"
          name="visibility"
          value="private"
          checked={formData.visibility === "private"}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label htmlFor="private" className="text-black">
          Privada
        </label>
      </div>

      <label className="self-start mt-10 text-lg font-semibold leading-none text-black">
        Fecha y hora de inicio
      </label>
      <input
        ref={startDateRef}
        type="datetime-local"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
        readOnly={isEdit}
        disabled={isEdit}
        className={`flex shrink-0 self-start mt-5 max-w-full bg-white text-black border border-solid shadow-sm border-[color:var(--Neutral-300,#EFF0F6)] h-[66px] rounded-[46px] w-[600px] p-4 ${isEdit ? 'opacity-70 cursor-not-allowed' : ''}`}
      />
      {isEdit && (
        <p className="text-gray-500 text-sm mt-1">La fecha de inicio no se puede modificar una vez creada la polla.</p>
      )}
      {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
      
      <label className="self-start mt-10 text-lg font-semibold leading-none text-black">
        Fecha y hora de finalización
      </label>
      <input
        ref={endDateRef}
        type="datetime-local"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
        className="flex shrink-0 self-start mt-5 max-w-full bg-white text-black border border-solid shadow-sm border-[color:var(--Neutral-300,#EFF0F6)] h-[66px] rounded-[46px] w-[600px] p-4"
      />
      {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
    </div>
  );
}
