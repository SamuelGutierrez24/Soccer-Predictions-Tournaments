'use client'
import React, {useState, useEffect} from 'react';
import { useUpdatePollaContext } from '../../../../context/updatePolla';
import { Progress } from '../../../../components/ui/progress';
import { pollaService } from '@/src/apis';
//import { PlatformConfig } from '@/src/interfaces/platform_confing.interface';

/*
interface FormErrors{
    exactlyScore?: string[];
    winnerSelector?: string[];
    goalDifference?: string[];
    maxScorer?: string[];
    maxAssist?: string[];
    winnerTeam?: string[];
    fewFences?: string[];
    _form: string[];
}*/

interface Props {
    params: { id: string }
}
function Step1EditPolla({params}: Props) {

    

    const  {
        nextStep,
        exactlyScore,
        setExactlyScore,
        winnerSelector,
        setWinnerSelector,
        winnerTeam,
        setWinnerTeam,
        teamWithMostGoals,
        setTeamWithMostGoals,
        setPlatformId
    } = useUpdatePollaContext();

    //const [isError, setIsError] = React.useState(false);
    //const [errors, setErrors] = React.useState<FormErrors>({});

    const [checkedMarcador, setCheckedMarcador] = useState(false);
    const [checkedGanador, setCheckedGanador] = useState(false);
    const [checkedGoles, setCheckedGoles] = useState(false);
    const [checkedTeamWithMostGoals, setCheckedTeamWithMostGoals] = useState(false);
 
    const [checkedCampeon, setCheckedCampeon] = useState(false);
    const [checkedSubcampeon, setCheckedSubcampeon] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            const resposePolla = await pollaService.getPollaById(params?.id);
            
            setPlatformId(resposePolla.platformConfig.id);
            setExactlyScore(resposePolla.platformConfig.exactScore);
            setWinnerSelector(resposePolla.platformConfig.matchWinner);
            setTeamWithMostGoals(resposePolla.platformConfig.teamWithMostGoals);
            setWinnerTeam(resposePolla.platformConfig.tournamentChampion);

            
        }
        fetchData();
    }, []);

    return (
        <div className='space-y-8'>
            <div className='space-y-2'>
                <p className='text-3xl ml-20'>Configuracion de puntos</p>
                <hr className="w-[90%] mx-auto" />
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 max-w-xl mx-auto">

                <Progress value={33} max={3} className="mb-6" />
                
                <h2 className="text-center font-bold text-lg mb-6">Activa los puntos sugeridos por POPOYA</h2>

               
                <div className="flex justify-center mb-2">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-medium hover:bg-blue-900">
                    Activar puntos sugeridos
                </button>
                </div>

                
                <div className="flex justify-center mb-4">
                <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
                </div>
                
                <h3 className="text-center font-medium text-base mb-6">Personaliza tu sistema de puntos</h3>

                <p className="text-center text-sm mb-6">Escoge como quieres repartir los puntos en tu juego.</p>

                <div className="space-y-4">
                    {/* Marcador Exacto */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        type="checkbox"
                        checked={checkedMarcador}
                        onChange={() => setCheckedMarcador(!checkedMarcador)}
                        className="w-5 h-5 rounded-full cursor-pointer border-gray-300 mr-3"
                        style={{ accentColor: '#9CA3AF' }}
                        />
                        <label className="text-sm">Marcador Exacto</label>
                    </div>
                    <div className="flex items-center">
                        <button 
                        type='button'
                        onClick={() => exactlyScore > 1 && setExactlyScore(exactlyScore - 1)}
                        disabled={!checkedMarcador}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2"
                        >
                        -
                        </button>
                        <span className="w-6 text-center">{exactlyScore}</span>
                        <button 
                        type='button'
                        onClick={() => setExactlyScore(exactlyScore + 1)}
                        disabled={!checkedMarcador}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2"
                        >
                        +
                        </button>
                    </div>
                    </div>

                    {/* Selección del ganador */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        type="checkbox"
                        checked={checkedGanador}
                        onChange={() => setCheckedGanador(!checkedGanador)}
                        className="w-5 h-5 rounded-full border-gray-300 mr-3"
                        style={{ accentColor: '#9CA3AF' }}
                        />
                        <label className="text-sm">Selección del ganador</label>
                    </div>
                    <div className="flex items-center">
                        <button 
                        type='button'
                        onClick={() => winnerSelector > 1 && setWinnerSelector(winnerSelector - 1)}
                        disabled={!checkedGanador}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2"
                        >
                        -
                        </button>
                        <span className="w-6 text-center">{winnerSelector}</span>
                        <button 
                        type='button'
                        onClick={() => setWinnerSelector(winnerSelector + 1)}
                        disabled={!checkedGanador}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2"
                        >
                        +
                        </button>
                    </div>
                    </div>
    
                    {/* Escoge un campeón */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        type="checkbox"
                        checked={checkedCampeon}
                        onChange={() => setCheckedCampeon(!checkedCampeon)}
                        className="w-5 h-5 rounded-full border-gray-300 mr-3"
                        style={{ accentColor: '#9CA3AF' }}
                        />
                        <label className="text-sm">Escoge un campeón</label>
                    </div>
                    <div className="flex items-center">
                        <button 
                        type='button'
                        onClick={() => winnerSelector > 1 && setWinnerSelector(winnerSelector - 1)}
                        disabled={!checkedCampeon}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2"
                        >
                        -
                        </button>
                        <span className="w-6 text-center">{winnerTeam}</span>
                        <button 
                        type='button'
                        onClick={() => setWinnerSelector(winnerSelector + 1)}
                        disabled={!checkedCampeon}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2"
                        >
                        +
                        </button>
                    </div>
                    </div>
                    
                    {/* Escoge el equipo con más goles */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        type="checkbox"
                        checked={checkedTeamWithMostGoals}
                        onChange={() => setCheckedTeamWithMostGoals(!checkedCampeon)}
                        className="w-5 h-5 rounded-full border-gray-300 mr-3"
                        style={{ accentColor: '#9CA3AF' }}
                        />
                        <label className="text-sm">Escoge el equipo con mas goles</label>
                    </div>
                    <div className="flex items-center">
                        <button 
                        type='button'
                        onClick={() => teamWithMostGoals > 1 && setTeamWithMostGoals(teamWithMostGoals - 1)}
                        disabled={!checkedTeamWithMostGoals}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2"
                        >
                        -
                        </button>
                        <span className="w-6 text-center">{teamWithMostGoals}</span>
                        <button 
                        type='button'
                        onClick={() => setTeamWithMostGoals(teamWithMostGoals + 1)}
                        disabled={!checkedTeamWithMostGoals}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2"
                        >
                        +
                        </button>
                    </div>
                    </div>

                    
                    <div className='justify-center flex '>
                        <button
                        
                            onClick={nextStep}
                            className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-900"
                        >
                            Siguiente
                        </button>
                    </div>
            </div>
            
        </div>
        </div>
    )


}

export default Step1EditPolla;