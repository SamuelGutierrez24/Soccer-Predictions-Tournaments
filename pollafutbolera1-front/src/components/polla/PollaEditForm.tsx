"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ProgressSteps } from "../nav/ProgressSteps";
import { NavigationButtons } from "../nav/NavigationButtons";
import { Step1 } from "../configuration/Step1";
import { Step2 } from "../configuration/Step2";
import { Step3 } from "../configuration/Step3";
import { getPollaForEdit, updatePolla } from "../../hooks/polla/useUpdatePolla";
import { updateRewards } from "../../hooks/reward/useReward";
import { getAllTournaments } from "../../hooks/tournament/useTournament";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TournamentDTO } from "../../interfaces/tournamentDTO.interface";
import { useImageUpload } from "../../hooks/auth/useImageUpload";

interface PollaEditFormProps {
  pollaId: string;
}

export function PollaEditForm({ pollaId }: PollaEditFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
  const [loadingTournaments, setLoadingTournaments] = useState(false);
  const { imageUpload } = useImageUpload();
  const [points, setPoints] = useState({
    tournamentChampion: 0,
    teamWithMostGoals: 0,
    exactScore: 0,
    matchWinner: 0,
  });
  const [platformConfigId, setPlatformConfigId] = useState<number | null>(null);
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
  const [originalData, setOriginalData] = useState({
    tournamentId: 1,
    companyId: null as any
  });

  // Load tournaments data
  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoadingTournaments(true);
        const tournamentsData = await getAllTournaments();
        setTournaments(tournamentsData);
      } catch (error) {
        toast.error("Error al cargar los torneos");
      } finally {
        setLoadingTournaments(false);
      }
    };

    loadTournaments();
  }, []);

  useEffect(() => {
    // Fetch polla and rewards data when component mounts
    const fetchPollaData = async () => {
      try {
        setLoading(true);
        const pollaData = await getPollaForEdit(pollaId);
        
        // Format dates properly for datetime-local input fields
        const formatDateForInput = (dateString: string) => {
          try {
            // Parse the ISO date string
            const originalDate = new Date(dateString);
            
            // Using local timezone adjustment to get the correct values
            // This ensures the date shown in the input matches the original date regardless of timezone
            const utcYear = originalDate.getUTCFullYear();
            const utcMonth = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
            const utcDay = String(originalDate.getUTCDate()).padStart(2, '0');
            const utcHours = String(originalDate.getUTCHours()).padStart(2, '0');
            const utcMinutes = String(originalDate.getUTCMinutes()).padStart(2, '0');
            
            // Format is YYYY-MM-DDThh:mm
            const formattedDateTime = `${utcYear}-${utcMonth}-${utcDay}T${utcHours}:${utcMinutes}`;
            
            return formattedDateTime;
          } catch (error) {
            return ""; // Return empty string if parsing fails
          }
        };
        
        // Store the original tournament ID and company ID to use in the update
        const tournamentId = pollaData.tournament?.id || pollaData.tournamentId;
        const companyId = pollaData.company?.id || pollaData.companyId;
        
        setOriginalData({
          tournamentId: tournamentId || 1,
          companyId: companyId
        });
        
        // Set form data
        setFormData({
          additionalRules: pollaData.additionalRules || "",
          visibility: pollaData.isPrivate ? "private" : "public",
          startDate: formatDateForInput(pollaData.startDate),
          endDate: formatDateForInput(pollaData.endDate),
          color: pollaData.color || "",
          logoFile: null,
          logoUrl: pollaData.imageUrl || "",
          tournamentId: tournamentId || null,
        });
        
        // Set points data
        if (pollaData.platformConfig) {
          // Store the platformConfig ID
          setPlatformConfigId(pollaData.platformConfig.id);
          
          setPoints({
            tournamentChampion: pollaData.platformConfig.tournamentChampion || 0,
            teamWithMostGoals: pollaData.platformConfig.teamWithMostGoals || 0,
            exactScore: pollaData.platformConfig.exactScore || 0,
            matchWinner: pollaData.platformConfig.matchWinner || 0,
          });
        }
        
        // Set rewards data if available
        if (pollaData.rewards && pollaData.rewards.length > 0) {
          const firstPrize = pollaData.rewards.find((r: any) => r.position === 1) || {};
          const secondPrize = pollaData.rewards.find((r: any) => r.position === 2) || {};
          const thirdPrize = pollaData.rewards.find((r: any) => r.position === 3) || {};
          
          setRewardsData({
            firstPrizeTitle: firstPrize.name || "",
            firstPrizeDescription: firstPrize.description || "",
            secondPrizeTitle: secondPrize.name || "",
            secondPrizeDescription: secondPrize.description || "",
            thirdPrizeTitle: thirdPrize.name || "",
            thirdPrizeDescription: thirdPrize.description || "",
            firstPrizeFile: null,
            secondPrizeFile: null,
            thirdPrizeFile: null,
            firstPrizeImageUrl: firstPrize.image || "",
            secondPrizeImageUrl: secondPrize.image || "",
            thirdPrizeImageUrl: thirdPrize.image || "",
          });
        }
        
        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar los datos de la polla");
        setLoading(false);
      }
    };
    
    if (pollaId) {
      fetchPollaData();
    }
  }, [pollaId]);

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

  const validateDates = () => {
    const newErrors = { ...formErrors };
    const now = new Date();

    if (formData.startDate) {
      // For datetime-local format (YYYY-MM-DDThh:mm), we parse it correctly
      const startDate = new Date(formData.startDate);

      // Skip start date validation when editing an existing polla
      // The start date is read-only in edit mode
      if (false) { // Always skip this validation for edit form
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
      }

      if (!formData.endDate) {
        newErrors.endDate = "La fecha de finalización es obligatoria";
        isValid = false;
      } else if (endDate && startDate && endDate <= startDate) {
        newErrors.endDate = "La fecha de fin debe ser mayor a la fecha de inicio";
        isValid = false;
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

  const handleUpdatePolla = async () => {
    if (!validateStep()) {
      toast.error("Por favor, corrige los errores antes de continuar");
      return;
    }
    try {
      // Upload images only if new files are selected
      let logoUrl = formData.logoUrl; // Keep existing URL as default
      let firstPrizeUrl = rewardsData.firstPrizeImageUrl;
      let secondPrizeUrl = rewardsData.secondPrizeImageUrl;
      let thirdPrizeUrl = rewardsData.thirdPrizeImageUrl;

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
      // Format dates as ISO strings for the API
      const startDateObj = new Date(formData.startDate);
      const endDateObj = new Date(formData.endDate);

      // Get the company ID in the correct format
      const companyId = typeof originalData.companyId === 'object' && originalData.companyId?.id 
        ? originalData.companyId.id 
        : (typeof originalData.companyId === 'number' ? originalData.companyId : undefined);

      // Prepare rewards data
      const rewards = [
        {
          pollaId: Number(pollaId),
          name: rewardsData.firstPrizeTitle,
          description: rewardsData.firstPrizeDescription,
          image: firstPrizeUrl,
          position: 1,
        },
        {
          pollaId: Number(pollaId),
          name: rewardsData.secondPrizeTitle,
          description: rewardsData.secondPrizeDescription,
          image: secondPrizeUrl,
          position: 2,
        },
        {
          pollaId: Number(pollaId),
          name: rewardsData.thirdPrizeTitle,
          description: rewardsData.thirdPrizeDescription,
          image: thirdPrizeUrl,
          position: 3,
        },
      ];

      const pollaConfig = {
        startDate: startDateObj.toISOString(), // Use ISO format for API
        endDate: endDateObj.toISOString(),     // Use ISO format for API
        isPrivate: formData.visibility === "private",
        color: formData.color,
        imageUrl: logoUrl,
        platformConfig: {
          id: platformConfigId,
          tournamentChampion: points.tournamentChampion,
          teamWithMostGoals: points.teamWithMostGoals,
          exactScore: points.exactScore,
          matchWinner: points.matchWinner,
        },
        tournamentId: formData.tournamentId || originalData.tournamentId,
        company: companyId,
        // Include rewards in the update payload
        rewards: rewards
      };

      await updatePolla(pollaId, pollaConfig);
      
      toast.success("Polla actualizada exitosamente");
      router.push("/admin");
    } catch (error: any) {
      // Add more detailed error logging
      if (error.response) {
        toast.error(`Error al actualizar: ${error.response.status} ${error.response.data?.message || ""}`);
      } else if (error.request) {
        toast.error("Error de conexión al servidor");
      } else {
        toast.error("Hubo un error al actualizar la polla y premios");
      }
    }
  };

  useEffect(() => {
    if (currentStep === 1) {
    }
  }, [currentStep, formData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando datos de la polla...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full px-4 py-6">
        {/* <h1 className="text-3xl font-bold text-black mb-2">
          Editar Polla
        </h1>
        <div className="h-1 bg-blue-600 w-24 mb-8" /> */}

        <section className="w-full max-w-3xl bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <ProgressSteps currentStep={currentStep} />

            <div className="mt-8">
              {currentStep === 1 && (
                <>
                  <Step1
                    formData={formData}
                    setFormData={setFormData}
                    errors={formErrors}
                    setErrors={setFormErrors}
                    tournaments={tournaments}
                    loadingTournaments={loadingTournaments}
                    isEdit={true}
                  />
                </>
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
            handleCreatePolla={handleUpdatePolla}
            isEdit={true}
          />
        </div>
      </div>
    </main>
  );
} 