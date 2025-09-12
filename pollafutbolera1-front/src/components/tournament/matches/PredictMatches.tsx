'use client';

import React, { useState, useEffect } from "react";
import { formatMatchDate } from "@/src/utils/match_format";
import MatchItem from "@/src/components/tournament/matches/MatchItem";
import { pollaService, pollaDetailsApi } from "@/src/apis";
import { Team } from "@/src/interfaces/polla";
import { Match } from "@/src/interfaces/polla";
import toast from "react-hot-toast";
import { MatchBet } from "@/src/interfaces/polla";

interface PreditctMatchesProps {
    pollaId: string;
    teams: Team[];
    matches: Match[];
}

interface MatchWithTeams extends Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
}

const PredictMatches: React.FC<PreditctMatchesProps> = ({ pollaId, teams, matches }) => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMatch, setSelectedMatch] = useState<MatchWithTeams | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userBets, setUserBets] = useState<MatchBet[]>([]);
    const [isLoadingBets, setIsLoadingBets] = useState(false);    // Prediction state
    const [homeScorePrediction, setHomeScorePrediction] = useState<string>('');
    const [awayScorePrediction, setAwayScorePrediction] = useState<string>('');
    const [isSubmittingPrediction, setIsSubmittingPrediction] = useState(false);
    
    // Fetch user bets on component mount
    useEffect(() => {
        const fetchUserBets = async () => {
            setIsLoadingBets(true);
            try {
                const bets = await pollaDetailsApi.getMatchBets(pollaId);
                setUserBets(bets);
                console.log('Loaded user bets:', bets);
            } catch (error) {
                console.error('Error fetching user bets:', error);
                // Don't show an alert here, just log the error
                // The component will work without existing bets
                setUserBets([]);
            } finally {
                setIsLoadingBets(false);
            }
        };

        fetchUserBets();
    }, [pollaId]);if (!matches?.length) {
        return (
            <div className="py-4 text-center text-gray-600">
                <img
                    src="/pollas/sad-chicken.png"
                    alt="Sad chicken"
                    className="mx-auto mb-4 w-32 h-32 opacity-50 filter grayscale"
                />
                No hay partidos disponibles.
            </div>
        );
    }    if (isLoadingBets) {
        return (
            <div className="py-4 text-center text-gray-600">
                <div className="mx-auto mb-4 w-32 h-32 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                </div>
                Cargando predicciones...
            </div>
        );
    }

    const mappedMatches = matches.map((match) => {
        const homeTeam =
            teams.find((t) => String(t.id) === String(match.homeTeamId)) || {
                id: match.homeTeamId,
                name: "Equipo desconocido",
                logoUrl: "https://via.placeholder.com/64",
            };
        const awayTeam =
            teams.find((t) => String(t.id) === String(match.awayTeamId)) || {
                id: match.awayTeamId,
                name: "Equipo desconocido",
                logoUrl: "https://via.placeholder.com/64",
            };
        return { ...match, homeTeam, awayTeam };
    });

    const sortedMatches = mappedMatches.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const totalPages = Math.ceil(sortedMatches.length / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const pageMatches = sortedMatches.slice(startIdx, startIdx + pageSize);

    const groupedPage = pageMatches.reduce<Record<string, typeof pageMatches>>(
        (acc, m) => {
            const date = formatMatchDate(m.date);
            if (!acc[date]) acc[date] = [];
            acc[date].push(m);
            return acc;
        },
        {}
    );
    const dates = Object.keys(groupedPage).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );    const handleMatchClick = (match: MatchWithTeams) => {
        setSelectedMatch(match);
        setIsModalOpen(true);
          // Check if user has already bet on this match
        const existingBet = userBets.find(bet => bet.match.homeTeam.id === match.homeTeam.id && bet.match.awayTeam.id === match.awayTeam.id);
        
        if (existingBet) {
            // Pre-fill with existing bet scores
            setHomeScorePrediction(existingBet.homeScore.toString());
            setAwayScorePrediction(existingBet.awayScore.toString());
        } else {
            // Reset prediction inputs for new bet
            setHomeScorePrediction('');
            setAwayScorePrediction('');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
        setHomeScorePrediction('');
        setAwayScorePrediction('');
    };    const handlePrediction = async (matchId: string, pollaId: string) => {
        if (!selectedMatch) return;

        const homeScore = parseInt(homeScorePrediction);
        const awayScore = parseInt(awayScorePrediction);        // Validate scores
        if (isNaN(homeScore) || isNaN(awayScore) ) {
            toast.error('Por favor ingresa resultados válidos (números enteros no negativos)');
            return;
        }

        setIsSubmittingPrediction(true);

        try {            // Check if user has already bet on this match
            const existingBet = userBets.find(bet => bet.match.homeTeam.id === selectedMatch.homeTeam.id && bet.match.awayTeam.id === selectedMatch.awayTeam.id);
            
            if (existingBet) {
                // Update existing bet
                console.log('Updating prediction:', {
                    matchBetId: existingBet.id,
                    homeScore,
                    awayScore,
                    homeTeam: selectedMatch.homeTeam.name,
                    awayTeam: selectedMatch.awayTeam.name
                });

                await pollaService.updateMatchBet(
                    existingBet.id.toString(),
                    homeScore,
                    awayScore                );

                toast.success(`Predicción actualizada: ${selectedMatch.homeTeam.name} ${homeScore} - ${awayScore} ${selectedMatch.awayTeam.name}`);
                
                // Update local state
                setUserBets(prev => prev.map(bet => 
                    bet.id === existingBet.id 
                        ? { ...bet, homeScore, awayScore }
                        : bet
                ));
            } else {
                // Create new bet
                console.log('Creating new prediction:', {
                    matchId: selectedMatch.id,
                    pollaId,
                    homeScore,
                    awayScore,
                    homeTeam: selectedMatch.homeTeam.name,
                    awayTeam: selectedMatch.awayTeam.name
                });

                const response = await pollaService.postMatchBet(
                    homeScore,
                    awayScore,
                    selectedMatch.id.toString(),
                    pollaId                );

                toast.success(`Predicción guardada: ${selectedMatch.homeTeam.name} ${homeScore} - ${awayScore} ${selectedMatch.awayTeam.name}`);
                
                // Refresh user bets to get the new bet with its ID
                const updatedBets = await pollaDetailsApi.getMatchBets(pollaId);
                setUserBets(updatedBets);
            }            closeModal();        } catch (error: any) {
            console.error('Error submitting prediction:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Error desconocido';
            toast.error('Error al guardar la predicción. Inténtalo de nuevo.');
        } finally {
            setIsSubmittingPrediction(false);
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };    const isPredictionValid = () => {
        const homeScore = parseInt(homeScorePrediction);
        const awayScore = parseInt(awayScorePrediction);
        return !isNaN(homeScore) && !isNaN(awayScore);
    };    const getExistingBet = (match: MatchWithTeams) => {
        return userBets.find(bet => bet.match.homeTeam.id === match.homeTeam.id && bet.match.awayTeam.id === match.awayTeam.id);
    };

    const isUpdatingBet = selectedMatch ? !!getExistingBet(selectedMatch) : false;    return (        <div className="my-8 space-y-8">
            {dates.map((date) => (
                <div key={date}>
                    <h3 className="text-2xl font-semibold mb-4">{date}</h3>
                    <div className="flex flex-col space-y-4">
                        {groupedPage[date].map((m) => {
                            const existingBet = getExistingBet(m);
                            return (
                                <div
                                    className="cursor-pointer hover:opacity-80 transition-opacity relative"
                                    onClick={() => handleMatchClick(m)}
                                    key={m.id}
                                >
                                    {existingBet && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                                            Predicción: {existingBet.homeScore}-{existingBet.awayScore}
                                        </div>
                                    )}
                                    <MatchItem
                                        key={m.id}
                                        match={m}
                                        homeTeam={m.homeTeam}
                                        awayTeam={m.awayTeam}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedMatch && (
                <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
                        <div className="p-6">                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {isUpdatingBet ? 'Actualizar Predicción' : 'Hacer Predicción'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Teams */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex flex-col items-center text-center flex-1">
                                    <img
                                        src={selectedMatch.homeTeam.logoUrl}
                                        alt={selectedMatch.homeTeam.name}
                                        className="w-16 h-16 mb-2"
                                    />
                                    <h3 className="font-semibold text-gray-800">
                                        {selectedMatch.homeTeam.name}
                                    </h3>
                                </div>

                                <div className="px-4">
                                    <div className="text-2xl font-bold text-gray-600">VS</div>
                                </div>

                                <div className="flex flex-col items-center text-center flex-1">
                                    <img
                                        src={selectedMatch.awayTeam.logoUrl}
                                        alt={selectedMatch.awayTeam.name}
                                        className="w-16 h-16 mb-2"
                                    />
                                    <h3 className="font-semibold text-gray-800">
                                        {selectedMatch.awayTeam.name}
                                    </h3>
                                </div>
                            </div>                            {/* Prediction Section */}
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-4 text-center">
                                    {isUpdatingBet ? 'Actualizar Tu Predicción' : 'Tu Predicción'}
                                </h4>
                                {isUpdatingBet && (
                                    <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                                        <p className="text-green-800 text-sm text-center">
                                            Predicción actual: {getExistingBet(selectedMatch)?.homeScore} - {getExistingBet(selectedMatch)?.awayScore}
                                        </p>
                                    </div>
                                )}
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {selectedMatch.homeTeam.name}
                                        </p>
                                        <input
                                            type="number"
                                            min="0"
                                            value={homeScorePrediction}
                                            onChange={(e) => setHomeScorePrediction(e.target.value)}
                                            className="w-16 h-12 text-center text-xl font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="text-2xl font-bold text-blue-600">-</div>

                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {selectedMatch.awayTeam.name}
                                        </p>
                                        <input
                                            type="number"
                                            min="0"
                                            value={awayScorePrediction}
                                            onChange={(e) => setAwayScorePrediction(e.target.value)}
                                            className="w-16 h-12 text-center text-xl font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    disabled={isSubmittingPrediction}
                                >
                                    Cancelar
                                </button>                                <button
                                    onClick={() => handlePrediction(selectedMatch.id.toString(), pollaId)}
                                    disabled={!isPredictionValid() || isSubmittingPrediction}
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmittingPrediction 
                                        ? (isUpdatingBet ? 'Actualizando...' : 'Guardando...') 
                                        : (isUpdatingBet ? 'Actualizar' : 'Predecir')
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictMatches;