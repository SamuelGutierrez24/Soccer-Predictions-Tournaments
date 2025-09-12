import React, { createContext, useContext, useState, ReactNode } from "react";
import { Tournament } from "../interfaces/tournament.interface";
import { Company } from "../interfaces/company.interface";

interface updatePollaContextData {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    exactlyScore: number;
    setExactlyScore: React.Dispatch<React.SetStateAction<number>>;
    winnerSelector: number;
    setWinnerSelector: React.Dispatch<React.SetStateAction<number>>;
    goalDifference: number;
    setGoalDifference: React.Dispatch<React.SetStateAction<number>>;
    maxScorer: number;
    setMaxScorer: React.Dispatch<React.SetStateAction<number>>;
    maxAssist: number;
    setMaxAssist: React.Dispatch<React.SetStateAction<number>>;
    winnerTeam: number;
    setWinnerTeam: React.Dispatch<React.SetStateAction<number>>;
    fewFences: number;
    setFewFences: React.Dispatch<React.SetStateAction<number>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    rules: string;
    setRules: React.Dispatch<React.SetStateAction<string>>;
    logo: File[] | null;
    setLogo: React.Dispatch<React.SetStateAction<File[] | null>>;
    maxTime: number;
    setMaxTime: React.Dispatch<React.SetStateAction<number>>;
    awardTitle: string[];
    setAwardTitle: React.Dispatch<React.SetStateAction<string[]>>;
    awardDescription: string[];
    setAwardDescription: React.Dispatch<React.SetStateAction<string[]>>;
    awardImage: File[];
    setAwardImage: React.Dispatch<React.SetStateAction<File[]>>;
    position: number[];
    setPosition: React.Dispatch<React.SetStateAction<number[]>>;
    teamWithMostGoals: number;
    setTeamWithMostGoals: React.Dispatch<React.SetStateAction<number>>;
    startDate: Date | undefined;
    setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    endDate: Date | undefined;
    setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    isPrivate: boolean;
    setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
    rewardId: number [];
    setRewardId: React.Dispatch<React.SetStateAction<number[]>>;
    tournament_id: Tournament | undefined;
    setTournament_id: React.Dispatch<React.SetStateAction<Tournament | undefined>>;
    company: Company | undefined;
    setCompany: React.Dispatch<React.SetStateAction<Company | undefined>>;
    platformId: number;
    setPlatformId: React.Dispatch<React.SetStateAction<number>>;
    
}

interface updatePollaProviderProps {
    children: ReactNode;
}

const updatePollaContext = createContext<updatePollaContextData | null>(null);

export const useUpdatePollaContext = () => {

    const context = useContext(updatePollaContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const UpdatePollaProvider: React.FC<updatePollaProviderProps> = ({ children }) => {

    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => {
        if (prev > 1) {
            return prev - 1
        }
        return prev
    });

    const [exactlyScore, setExactlyScore] = useState(0);
    const [winnerSelector, setWinnerSelector] = useState(0);
    const [goalDifference, setGoalDifference] = useState(0);
    const [maxScorer, setMaxScorer] = useState(0);
    const [maxAssist, setMaxAssist] = useState(0);
    const [winnerTeam, setWinnerTeam] = useState(0);
    const [fewFences, setFewFences] = useState(0);
    const [name, setName] = useState('');
    const [rules, setRules] = useState('');
    const [logo, setLogo] = useState<File[] | null>(null);
    const [maxTime, setMaxTime] = useState(0);
    const [awardTitle, setAwardTitle] = useState<string[]>([]);
    const [awardDescription, setAwardDescription] = useState<string[]>([]);
    const [awardImage, setAwardImage] = useState<File[]>([]);
    const [teamWithMostGoals, setTeamWithMostGoals] = useState(0);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [isPrivate, setIsPrivate] = useState(false);
    const [position, setPosition] = useState<number[]>([]);
    const [rewardId, setRewardId] = useState<number[]>([]);
    const [tournament_id, setTournament_id] = useState<Tournament | undefined>();
    const [company, setCompany] = useState<Company | undefined>();
    const [platformId, setPlatformId] = useState(0);
    
    


    return (
        <updatePollaContext.Provider 
        value={{
            step,
            nextStep,
            prevStep,
            exactlyScore,
            setExactlyScore,
            winnerSelector,
            setWinnerSelector,
            goalDifference,
            setGoalDifference,
            maxScorer,
            setMaxScorer,
            maxAssist,
            setMaxAssist,
            winnerTeam,
            setWinnerTeam,
            fewFences,
            setFewFences,
            name,
            setName,
            rules,
            setRules,
            logo,
            setLogo,
            maxTime,
            setMaxTime,
            awardTitle,
            setAwardTitle,
            awardDescription,
            setAwardDescription,
            awardImage,
            setAwardImage,
            teamWithMostGoals,
            setTeamWithMostGoals,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            isPrivate,
            setIsPrivate,
            position,
            setPosition, 
            rewardId,
            setRewardId,
            tournament_id,
            setTournament_id,
            company,
            setCompany,
            platformId,
            setPlatformId,
        }}>
            {children}
        </updatePollaContext.Provider>
    );
}


