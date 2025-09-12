import React, { useState } from 'react';
import { MatchBet, Team, Tournament, TournamentBet } from '@/src/interfaces/polla';
import MatchBetVissualizer from './MatchBetVissualizer';
import { Trophy, Target, Star, Award, Calendar, Edit3 } from 'lucide-react';
import TournamentPredictionsModal from './EditModal';
import { pollaService } from '@/src/apis';
import toast from "react-hot-toast";



type MyBetsProps = {
    matchBets: MatchBet[];
    tournamentBet: TournamentBet | null; 
    tournament: Tournament | null;
    teams: Team[];
    winnerTeam: Team | null;
    topScorerTeam: Team | null;
};
function MyBets({ matchBets, tournamentBet, tournament, winnerTeam, topScorerTeam, teams }: MyBetsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSavePredictions = async (winnerTeamId: number | null, scorerTeamId: number | null) => {
        if (!tournamentBet || !winnerTeamId || !scorerTeamId) {
            toast.error("Por favor selecciona tanto el equipo ganador como el equipo goleador");
            return;
        }

        setIsSubmitting(true);
        
        try {
            await pollaService.updateTournamentBet(tournamentBet.id, winnerTeamId, scorerTeamId);
            
            const winnerTeamName = teams.find(t => t.id === winnerTeamId)?.name || "Equipo seleccionado";
            const scorerTeamName = teams.find(t => t.id === scorerTeamId)?.name || "Equipo seleccionado";
            
            toast.success(`Predicciones actualizadas correctamente! Por favor recarga la página para ver los cambios.`);
            console.log("Predicciones actualizadas correctamente");
            handleCloseModal();
        } catch (error: any) {
            console.error("Error al actualizar predicciones:", error);
            if (error.response?.status === 409) {
                toast.error("Ya has realizado una predicción para este torneo.");
            } else {
                toast.error("Ocurrió un error al actualizar las predicciones. Inténtalo de nuevo.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                        <Trophy className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                        <h2 className="text-xl font-bold text-gray-800">Torneo: {tournament?.name}</h2>
                        </div>
                    </div>
                    <button
                        onClick={handleOpenModal}
                        disabled={isSubmitting}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <Edit3 className="h-4 w-4" />
                        <span className="font-medium">
                            {isSubmitting ? 'Guardando...' : 'Editar Predicciones'}
                        </span>
                    </button>
                </div>
                <div className="text-right">
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                    tournamentBet?.earnedPoints && tournamentBet?.earnedPoints > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">{tournamentBet?.earnedPoints} puntos</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                    {tournamentBet?.earnedPoints && tournamentBet?.earnedPoints > 0 ? 'Puntos ganados' : 'En juego'}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200 h-full">
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="h-6 w-6 text-yellow-600" />
                            <h3 className="text-lg font-bold text-yellow-800">Campeón</h3>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                            {winnerTeam? (
                                <img 
                                src={winnerTeam.logoUrl} 
                                alt={winnerTeam.name}
                                className="w-16 h-16 object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = '/pollas/ball.png'; // Fallback image
                                }}
                                />

                            ):(
                                <img 
                                src="/pollas/ball.png"
                                alt="Equipo ganador"
                                className="w-16 h-16 object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = '/pollas/ball.png'; // Fallback image
                                }}
                                />
                            )}
                            
                            </div>
                            {winnerTeam? (
                                <>
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">{winnerTeam.name}</h4>
                                    <p className="text-yellow-700 font-medium">Tu favorito para ganar</p>
                                </>
                            ):(
                                <>
                                    <p className="text-yellow-700 font-medium">Ve y predice tu equipo ganador</p>
                                </>
                            )}
                            
                        </div>
                        </div>
                    </div>

                    
                    <div className="relative">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 h-full">
                        <div className="flex items-center space-x-2 mb-4">
                            <Target className="h-6 w-6 text-green-600" />
                            <h3 className="text-lg font-bold text-green-800">Más Goleador</h3>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                            {topScorerTeam? (
                                <img 
                                src={topScorerTeam.logoUrl} 
                                alt={topScorerTeam.name}
                                className="w-16 h-16 object-contain"
                            />

                            ):(
                                <img 
                                src="/pollas/ball.png" 
                                alt="Equipo goleador"
                                className="w-16 h-16 object-contain"
                                />
                            )}
                            
                            </div>
                            {topScorerTeam? (
                                <>
                                <h4 className="text-xl font-bold text-gray-800 mb-1">{topScorerTeam.name}</h4>
                                <p className="text-green-700 font-medium">Equipo con más goles</p>
                                </>
                            ):(
                                <p className="text-green-700 font-medium">Ve y predice tu equipo goleador</p>
                            )}
                            
                        </div>
                        </div>
                    </div>
                    </div>
                
            </div>
            <div className="flex flex-wrap gap-4 mt-9">
                {matchBets.map((matchBet: MatchBet) => (
                <div key={matchBet.id} className="w-full md:w-[calc(50%-0.5rem)] box-border">
                    <MatchBetVissualizer matchBet={matchBet} />
                </div>
                ))}
            </div>
            <TournamentPredictionsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                teams={teams}
                currentWinnerTeam={winnerTeam}
                currentScorerTeam={topScorerTeam}
                onSave={handleSavePredictions}
            />
        </>
    );
}

export default MyBets