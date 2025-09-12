"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ProgressSteps } from "../nav/ProgressSteps";
import { NavigationButtons } from "../nav/NavigationButtons";
import { Step1 } from "../configuration/Step1";
import { Step2 } from "../configuration/Step2";
import { Step3 } from "../configuration/Step3";
import { createPolla } from "../../hooks/polla/usePolla";
import { saveRewards } from "../../hooks/reward/useReward";
import { getAllTournaments } from "../../hooks/tournament/useTournament";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useImageUpload } from "../../hooks/auth/useImageUpload";
import { TournamentDTO } from "../../interfaces/tournamentDTO.interface";


export function ConfigurationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { imageUpload } = useImageUpload();
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  const [points, setPoints] = useState({
    tournamentChampion: 0,
    teamWithMostGoals: 0,
    exactScore: 0,
    matchWinner: 0,
  });
  const [formData, setFormData] = useState({
    additionalRules: "",
    visibility: "public",
    startDate: "",
    endDate: "",
    color: "",
    logoFile: null as File | null,
    logoUrl: "",
    tournamentId: null as number | null,
  });
  const [rewardsData, setRewardsData] = useState({
    firstPrizeTitle: "",
    firstPrizeDescription: "",
    secondPrizeTitle: "",
    secondPrizeDescription: "",
    thirdPrizeTitle: "",
    thirdPrizeDescription: "",
    firstPrizeFile: null as File | null,
    secondPrizeFile: null as File | null,
    thirdPrizeFile: null as File | null,
    firstPrizeImageUrl: "",
    secondPrizeImageUrl: "",
    thirdPrizeImageUrl: "",
  });
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
    tournamentId: "",
  });
  const [rewardsErrors, setRewardsErrors] = useState({
    firstPrizeTitle: "",
    firstPrizeDescription: "",
    secondPrizeTitle: "",
    secondPrizeDescription: "",
    thirdPrizeTitle: "",
    thirdPrizeDescription: "",
  });

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    } else {
      toast.error("Por favor, corrige los errores antes de continuar");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  useEffect(() => {
    validateDates();
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoadingTournaments(true);
        const tournamentsData = await getAllTournaments();
        setTournaments(tournamentsData);
      } catch (error) {
        console.error("Error loading tournaments:", error);
        toast.error("Error al cargar los torneos");
      } finally {
        setLoadingTournaments(false);
      }
    };

    loadTournaments();
  }, []);

  const validateDates = () => {
    const newErrors = { ...formErrors };
    const now = new Date();

    if (formData.startDate) {
      const startDate = new Date(formData.startDate);

      // Validate start date is not in the past
      if (startDate < now) {
        newErrors.startDate = "La fecha de inicio no puede ser menor a la fecha actual";
      } else {
        newErrors.startDate = "";
      }

      // Validate end date is after start date
      if (formData.endDate) {
        const endDate = new Date(formData.endDate);
        if (endDate <= startDate) {
          newErrors.endDate = "La fecha de fin debe ser mayor a la fecha de inicio";
        } else {
          newErrors.endDate = "";
        }
      }
    }

    setFormErrors(newErrors);
  };
  const validateStep = () => {
    if (currentStep === 1) {
      const now = new Date();
      const startDate = formData.startDate ? new Date(formData.startDate) : null;
      const endDate = formData.endDate ? new Date(formData.endDate) : null;

      const newErrors = { ...formErrors };
      let isValid = true;

      if (!formData.startDate) {
        newErrors.startDate = "La fecha de inicio es obligatoria";
        isValid = false;
      } else if (startDate && startDate < now) {
        newErrors.startDate = "La fecha de inicio no puede ser menor a la fecha actual";
        isValid = false;
      }

      if (!formData.endDate) {
        newErrors.endDate = "La fecha de finalización es obligatoria";
        isValid = false;
      } else if (endDate && startDate && endDate <= startDate) {
        newErrors.endDate = "La fecha de fin debe ser mayor a la fecha de inicio";
        isValid = false;
      }

      if (!formData.tournamentId) {
        newErrors.tournamentId = "Debe seleccionar un torneo";
        isValid = false;
      } else {
        newErrors.tournamentId = "";
      }

      setFormErrors(newErrors);
      return isValid;
    }

    if (currentStep === 3) {
      const newErrors = { ...rewardsErrors };
      let isValid = true;

      if (!rewardsData.firstPrizeTitle.trim()) {
        newErrors.firstPrizeTitle = "El título del premio es obligatorio";
        isValid = false;
      } else {
        newErrors.firstPrizeTitle = "";
      }

      if (!rewardsData.firstPrizeDescription.trim()) {
        newErrors.firstPrizeDescription = "La descripción del premio es obligatoria";
        isValid = false;
      } else {
        newErrors.firstPrizeDescription = "";
      }

      if (!rewardsData.secondPrizeTitle.trim()) {
        newErrors.secondPrizeTitle = "El título del segundo premio es obligatorio";
        isValid = false;
      } else {
        newErrors.secondPrizeTitle = "";
      }

      if (!rewardsData.secondPrizeDescription.trim()) {
        newErrors.secondPrizeDescription = "La descripción del segundo premio es obligatoria";
        isValid = false;
      } else {
        newErrors.secondPrizeDescription = "";
      }

      if (!rewardsData.thirdPrizeTitle.trim()) {
        newErrors.thirdPrizeTitle = "El título del tercer premio es obligatorio";
        isValid = false;
      } else {
        newErrors.thirdPrizeTitle = "";
      }

      if (!rewardsData.thirdPrizeDescription.trim()) {
        newErrors.thirdPrizeDescription = "La descripción del tercer premio es obligatoria";
        isValid = false;
      } else {
        newErrors.thirdPrizeDescription = "";
      }

      setRewardsErrors(newErrors);
      return isValid;
    }

    return true;
  };

  const handleCreatePolla = async () => {
    if (!validateStep()) {
      toast.error("Por favor, corrige los errores antes de continuar");
      return;
    }
    try {
      // Subir imágenes solo si existen
      let logoUrl = "";
      let firstPrizeUrl = "";
      let secondPrizeUrl = "";
      let thirdPrizeUrl = "";
      if (formData.logoFile) {
        const res = await imageUpload(formData.logoFile);
        logoUrl = res.url || res.data?.url || res;
      }
      if (rewardsData.firstPrizeFile) {
        const res = await imageUpload(rewardsData.firstPrizeFile);
        firstPrizeUrl = res.url || res.data?.url || res;
      }
      if (rewardsData.secondPrizeFile) {
        const res = await imageUpload(rewardsData.secondPrizeFile);
        secondPrizeUrl = res.url || res.data?.url || res;
      }
      if (rewardsData.thirdPrizeFile) {
        const res = await imageUpload(rewardsData.thirdPrizeFile);
        thirdPrizeUrl = res.url || res.data?.url || res;
      }

      const pollaConfig = {
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        isPrivate: formData.visibility === "private",
        color: formData.color,
        imageUrl: logoUrl,
        platformConfig: {
          tournamentChampion: points.tournamentChampion,
          teamWithMostGoals: points.teamWithMostGoals,
          exactScore: points.exactScore,
          matchWinner: points.matchWinner,
        },        company:JSON.parse(Cookies.get('currentUser') || '').company, 
        tournamentId: formData.tournamentId,
      };

      const pollaResponse = await createPolla(pollaConfig);

      const rewards = [
        {
          pollaId: pollaResponse.id,
          name: rewardsData.firstPrizeTitle,
          description: rewardsData.firstPrizeDescription,
          image: firstPrizeUrl,
          position: 1,
        },
        {
          pollaId: pollaResponse.id,
          name: rewardsData.secondPrizeTitle,
          description: rewardsData.secondPrizeDescription,
          image: secondPrizeUrl,
          position: 2,
        },
        {
          pollaId: pollaResponse.id,
          name: rewardsData.thirdPrizeTitle,
          description: rewardsData.thirdPrizeDescription,
          image: thirdPrizeUrl,
          position: 3,
        },
      ];

      await saveRewards(rewards);
      alert("Torneo y premios creados exitosamente");
      router.push("/home");
    } catch (error) {
      console.error("Error creando el torneo y premios", error);
      alert("Hubo un error al crear el torneo y premios");
    }
  };

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full px-4 py-6">
        <h1 className="text-3xl font-bold text-black mb-2">
          Configuración de la Polla
        </h1>
        <div className="h-1 bg-blue-600 w-24 mb-8" />

        <section className="flex flex-col items-center self-center px-16 pt-3 pb-10 mt-11 max-w-full bg-white border border-solid shadow-lg border-[color:var(--Neutral-300,#EFF0F6)] rounded-[34px] w-[768px] max-md:px-5 max-md:mt-10">
          <div className="p-6">
            <ProgressSteps currentStep={currentStep} />

            <div className="mt-8">
              {currentStep === 1 && (
                <Step1
                  formData={formData}
                  setFormData={setFormData}
                  errors={formErrors}
                  setErrors={setFormErrors}
                  tournaments={tournaments}
                  loadingTournaments={loadingTournaments}
                />
              )}

              {currentStep === 2 && (
                <Step2 points={points} setPoints={setPoints} />
              )}

              {currentStep === 3 && (
                <Step3
                  formData={rewardsData}
                  setFormData={setRewardsData}
                  errors={rewardsErrors}
                  setErrors={setRewardsErrors}
                />
              )}
            </div>
          </div>
        </section>

        <div className="w-full max-w-3xl mt-6">
          <NavigationButtons
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentStep={currentStep}
            formData={formData}
            handleCreatePolla={handleCreatePolla}
          />
        </div>
      </div>
    </main>
  );
}
