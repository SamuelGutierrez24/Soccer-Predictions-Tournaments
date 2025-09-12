import React from "react";
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { Edit } from 'lucide-react';
import { MatchBet } from "@/src/interfaces/polla";
import Image from 'next/image'; 

interface MatchBetProps {
    matchBet: MatchBet;
}

function MatchBetVisualizer({ matchBet }: MatchBetProps) {
    const [showModal, setShowModal] = React.useState(false);
    const router = useRouter();
    const params = useParams();
    const idPolla = params['id-polla'] as string;

    // Helper function to get valid image URLs
    const getValidImageUrl = (team: any): string => {
        // If it's already a valid URL or path, return it
        if (team.logoUrl.startsWith('http') || team.logoUrl.startsWith('/')) {
            return team.logoUrl;
        }
        
        // Fallback to a default image if no specific mapping is found
        return "/pollas/default-flag.png"; 
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    
    // Function to determine if match is editable (between 24 hours and 30 minutes before start)
    const isMatchEditable = (): boolean => {
        const now = new Date();
        const matchDate = new Date(matchBet.match.date);
        
        // Time difference in milliseconds
        const timeDiff = matchDate.getTime() - now.getTime();
        
        // Convert to hours and minutes
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Check if time difference is between 24 hours and 30 minutes
        return hoursDiff <= 24 && hoursDiff >= 0.5;
    };
    
    // Navigate to edit page
    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        router.push(`/polla/${idPolla}/modificar-prediccion/${matchBet.id}`);
    };

    // Check if match has been played (has actual scores)
    const isMatchPlayed = matchBet.match.homeScore !== null && matchBet.match.homeScore !== undefined && 
                          matchBet.match.awayScore !== null && matchBet.match.awayScore !== undefined;

    // Función para determinar el resultado de la predicción
    const getPredictionResult = () => {
        if (!isMatchPlayed) {
            return { type: 'pending', label: 'Pendiente', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
        }

        const actualHomeScore = matchBet.match.homeScore;
        const actualAwayScore = matchBet.match.awayScore;
        const predictedHome = matchBet.homeScore;
        const predictedAway = matchBet.awayScore;

        if (actualHomeScore === predictedHome && actualAwayScore === predictedAway) {
            return { type: 'perfect', label: 'Predicción Exacta', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
        } else if (matchBet.earnedPoints > 0) {
            return { type: 'partial', label: 'Predicción Parcial', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
        } else {
            return { type: 'missed', label: 'Sin Puntos', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
        }
    };

    const predictionResult = getPredictionResult();

    return (
        <>
            {/* Card Principal con Gradiente y Animaciones */}
            <div className='relative bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer group overflow-hidden'
                onClick={openModal}
            >
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Indicador de Estado del Partido */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        {isMatchPlayed ? (
                            <>
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                    Finalizado
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                    Próximo
                                </span>
                            </>
                        )}

                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="flex items-center justify-between mt-4">
                    {/* Equipo Local */}
                    <div className="flex flex-col items-center space-y-3 flex-1">
                        <div className="relative group/team">
                            <Image 
                                className='h-12 w-12 object-contain transition-transform duration-200 group-hover/team:scale-110' 
                                src={matchBet.match.homeTeam.logoUrl} 
                                width={48} 
                                height={48} 
                                alt={`${matchBet.match.homeTeam.name} logo`}
                            />
                        </div>
                        <p className='text-gray-800 font-semibold text-sm text-center max-w-20 leading-tight'>
                            {matchBet.match.homeTeam.name}
                        </p>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-md">
                            {matchBet.homeScore}
                        </div>
                    </div>


                    {/* Resultado Central */}
                    <div className="flex flex-col items-center space-y-4 flex-1">
                        {isMatchPlayed ? (
                            <div className='bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl px-6 py-3 shadow-lg'>
                                <span className='text-2xl font-bold tracking-wider'>
                                    {matchBet.match.homeScore} - {matchBet.match.awayScore}
                                </span>
                            </div>
                        ) : (
                            <div className='bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl px-6 py-3 shadow-lg'>
                                <span className='text-lg font-medium tracking-wider'>
                                    VS
                                </span>
                            </div>
                        )}
                        <div className="text-center">
                            <p className='text-gray-500 text-xs mb-1'>
                                {new Date(matchBet.match.date).toLocaleDateString('es-ES', { 
                                    day: 'numeric', 
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Equipo Visitante */}
                    <div className="flex flex-col items-center space-y-3 flex-1">
                        <div className="relative group/team">
                            <Image 
                                className='h-12 w-12 object-contain transition-transform duration-200 group-hover/team:scale-110' 
                                src={matchBet.match.awayTeam.logoUrl} 
                                width={48} 
                                height={48} 
                                alt={`${matchBet.match.awayTeam.name} logo`}
                            />
                        </div>
                        <p className='text-gray-800 font-semibold text-sm text-center max-w-20 leading-tight'>
                            {matchBet.match.awayTeam.name}
                        </p>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-md">
                            {matchBet.awayScore}
                        </div>
                    </div>
                </div>

                {/* Footer con Puntos */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200/50">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${predictionResult.bgColor} ${predictionResult.borderColor} border`}>
                        <div className={`w-2 h-2 rounded-full ${
                            predictionResult.type === 'perfect' ? 'bg-green-500' : 
                            predictionResult.type === 'partial' ? 'bg-blue-500' : 
                            predictionResult.type === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-xs font-medium ${predictionResult.color}`}>
                            {predictionResult.label}
                        </span>
                    </div>
                    {isMatchPlayed && (
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500 text-sm">Puntos:</span>
                            <div className={`px-3 py-1 rounded-lg font-bold text-sm ${matchBet.earnedPoints > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {matchBet.earnedPoints}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Mejorado */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-2xl"
                        onClick={handleModalClick}
                    >
                        {/* Header del Modal */}
                        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Detalles del Partido
                            </h2>
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800 text-xl"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>

                        <div className="px-8 py-6">
                            {/* Encabezado del Partido */}
                            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 mb-8">
                                <div className="flex justify-between items-center">
                                    {/* Equipo Local */}
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-lg">
                                            <Image 
                                                className="w-full h-full object-contain" 
                                                src={matchBet.match.homeTeam.logoUrl} 
                                                width={80} 
                                                height={80} 
                                                alt={matchBet.match.homeTeam.name}
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg text-center text-gray-800 max-w-32">
                                            {matchBet.match.homeTeam.name}
                                        </h3>
                                    </div>

                                    {/* Resultado Central */}
                                    <div className="flex flex-col items-center space-y-4">
                                        {isMatchPlayed ? (
                                            <>
                                                <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-6 rounded-2xl shadow-xl">
                                                    <div className="text-4xl font-bold text-center">
                                                        <span>{matchBet.match.homeScore || '0'}</span>
                                                        <span className="mx-4 text-gray-300">-</span>
                                                        <span>{matchBet.match.awayScore || '0'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-red-100 text-red-600 font-medium px-4 py-2 rounded-full">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                    <span>Finalizado</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-6 rounded-2xl shadow-xl">
                                                    <div className="text-2xl font-bold text-center">
                                                        VS
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-orange-100 text-orange-600 font-medium px-4 py-2 rounded-full">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                    <span>Próximo Partido</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Equipo Visitante */}
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-lg">
                                            <Image 
                                                className="w-full h-full object-contain" 
                                                src={matchBet.match.awayTeam.logoUrl} 
                                                width={80} 
                                                height={80} 
                                                alt={matchBet.match.awayTeam.name}
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg text-center text-gray-800 max-w-32">
                                            {matchBet.match.awayTeam.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Información del Partido en Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200/50">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">📅</span>
                                        </div>
                                        <p className="text-blue-700 font-medium">Fecha</p>
                                    </div>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {new Date(matchBet.match.date).toLocaleDateString('es-ES', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200/50">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">🕐</span>
                                        </div>
                                        <p className="text-purple-700 font-medium">Hora</p>
                                    </div>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {new Date(matchBet.match.date).toLocaleTimeString('es-ES', { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200/50">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">🏟️</span>
                                        </div>
                                        <p className="text-green-700 font-medium">Estadio</p>
                                    </div>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        { 'No disponible'}
                                    </p>
                                </div>
                            </div>

                            {/* Predicción del Usuario */}
                            <div className="mb-8">
                                <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center space-x-3">
                                    <span>🎯</span>
                                    <span>Tu Predicción</span>
                                </h3>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200/50">
                                    <div className="flex justify-center items-center space-x-12">
                                        <div className="flex flex-col items-center space-y-3">
                                            <p className="text-gray-600 font-medium">Local</p>
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-3xl shadow-lg">
                                                {matchBet.homeScore}
                                            </div>
                                        </div>
                                        <div className="text-gray-400 text-2xl font-light">VS</div>
                                        <div className="flex flex-col items-center space-y-3">
                                            <p className="text-gray-600 font-medium">Visitante</p>
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-3xl shadow-lg">
                                                {matchBet.awayScore}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Puntos Ganados - Solo mostrar si el partido ya se jugó */}
                            {isMatchPlayed && (
                                <div className="mb-8">
                                    <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center space-x-3">
                                        <span>🏆</span>
                                        <span>Resultado</span>
                                    </h3>
                                    <div className={`${predictionResult.bgColor} rounded-2xl p-8 border ${predictionResult.borderColor}`}>
                                        <div className="text-center">
                                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${predictionResult.type === 'perfect' ? 'bg-green-500' : predictionResult.type === 'partial' ? 'bg-blue-500' : 'bg-red-500'} text-white text-3xl font-bold mb-4`}>
                                                {matchBet.earnedPoints}
                                            </div>
                                            <h4 className={`text-xl font-bold mb-2 ${predictionResult.color}`}>
                                                {predictionResult.label}
                                            </h4>
                                            <p className="text-gray-600 text-lg">
                                                {matchBet.earnedPoints > 0
                                                    ? matchBet.earnedPoints === 3 
                                                        ? '¡Predicción perfecta! Has acertado el resultado exacto.'
                                                        : '¡Buena predicción! Has ganado puntos parciales.'
                                                    : 'Esta vez no has conseguido puntos, ¡sigue intentándolo!'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mensaje para partidos no jugados */}
                            {!isMatchPlayed && (
                                <div className="mb-8">
                                    <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center space-x-3">
                                        <span>⏳</span>
                                        <span>Estado</span>
                                    </h3>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200/50">
                                        <div className="text-center">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500 text-white text-3xl font-bold mb-4">
                                                ⏱️
                                            </div>
                                            <h4 className="text-xl font-bold mb-2 text-orange-600">
                                                Partido Pendiente
                                            </h4>
                                            <p className="text-gray-600 text-lg">
                                                Este partido aún no se ha jugado. Los puntos se calculararán una vez que termine el partido.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botón de Cierre */}
                            <div className="text-center pt-4">
                                <button
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                                    onClick={closeModal}
                                >
                                    Cerrar Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MatchBetVisualizer