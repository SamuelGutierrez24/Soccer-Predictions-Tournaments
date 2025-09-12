import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { pollaService } from "@/src/apis";
import { Team } from "@/src/interfaces/polla";
// import { Match } from "date-fns"; // Remove this line

interface TeamProps {
    name: string;
    logoUrl: string;
}

interface Match {
    tournament: string;
    minutePlayed: React.JSX.Element;
    time: string;
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    date: string;
    status: string;
    homeScore: number;
    awayScore: number;
}

interface MatchProps {
    pollaId: string;
    match: Match;
}

const MatchCard = ({ matchProps: { pollaId, match } }: { matchProps: MatchProps }) => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const isCompleted = match.status === "completed";
    const isLive = match.status === "live";

    //Make prediction
    const [homeScore, setHomeScore] = useState<number | null>(null);
    const [awayScore, setAwayScore] = useState<number | null>(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    function handleMakePrediction() {
        if (homeScore === null || awayScore === null) {
            console.error("Please enter valid scores.");
            return;
        }
        if (homeScore < 0 || awayScore < 0) {
            console.error("Scores cannot be negative.");
            return;
        }

        pollaService.postMatchBet(
            homeScore,
            awayScore,
            match.id.toString(),
            pollaId
        )
        .then((response) => {
            alert(`Prediction made successfully: ${response.data}`);
        }).catch((error) => {
            alert(`Error making prediction: ${error}`);
        });

        setShowModal(false);
    }

    return (
        <>
            <Card
                className="p-4 flex flex-col items-center justify-between h-full bg-white cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowModal(true)}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-center">
                        <img src={match.status} alt={match.homeTeam.name} className="w-12 h-12 object-cover rounded-sm" />
                        <span className="text-sm mt-1">{match.homeTeam.name}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        {isCompleted ? (
                            <div className="flex items-center">
                                <span className="text-xl font-bold">{match.homeScore}</span>
                                <span className="mx-2">-</span>
                                <span className="text-xl font-bold">{match.awayScore}</span>
                            </div>
                        ) : (
                            <div className="text-sm font-medium">{match.time || "vs"}</div>
                        )}

                        {match.minutePlayed && (
                            <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-1">
                                {match.minutePlayed}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center">
                        <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-12 h-12 object-cover rounded-sm" />
                        <span className="text-sm mt-1">{match.awayTeam.name}</span>
                    </div>
                </div>
            </Card>

            {/* Custom Modal with Backdrop */}
            {showModal && (
                <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                        {/* Modal Header */}
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold">{match.tournament || "Mundial 2026"}</h3>
                            <p className="text-sm text-gray-500">{match.time || "Detalles del partido"}</p>
                        </div>

                        {/* Teams and Score */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                            <div className="flex flex-col items-center space-y-2">
                                <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-16 h-16 object-cover rounded-sm" />
                                <span className="font-medium">{match.homeTeam.name}</span>
                            </div>

                            <div className="flex flex-col items-center">
                                {isCompleted ? (
                                    <div className="flex items-center">
                                        <span className="text-3xl font-bold">{match.homeScore}</span>
                                        <span className="mx-3 text-xl">-</span>
                                        <span className="text-3xl font-bold">{match.awayScore}</span>
                                    </div>
                                ) : (
                                    <div className="text-lg font-medium">
                                        {isLive ? (
                                            <div className="flex flex-col items-center">
                                                <div className="text-red-600 font-bold">LIVE</div>
                                                <div className="text-sm">{match.minutePlayed}</div>
                                            </div>
                                        ) : (
                                            match.time || "vs"
                                        )}
                                    </div>
                                )}

                                <div className="text-sm text-gray-500 mt-2">
                                    {match.status === "completed" ? "Tiempo Finalizado" : 
                                        match.status === "live" ? "AHORA" : "Proximo"}
                                </div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-16 h-16 object-cover rounded-sm" />
                                <span className="font-medium">{match.awayTeam.name}</span>
                            </div>
                        </div>

                        {/* Match Status */}
                        <div className="mb-4 text-center">
                            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                                {match.status === "completed" && "Partido Finalizado"}
                                {match.status === "live" && "EN VIVO"}
                                {match.status === "scheduled" && "Proximo Partido"}
                            </div>
                        </div>

                        {/* Prediction Section - Only show for scheduled matches */}
                        {match.status === "scheduled" && (
                            <div className="mt-6 mb-6 p-4 border border-gray-200 rounded-lg">
                                <h4 className="font-semibold text-center mb-3">Haz tu prediccion</h4>
                                <div className="flex items-center justify-between">
                                    <div className="text-center w-1/3">
                                        <p className="text-sm mb-1">{match.homeTeam.name}</p>
                                        <input
                                            type="number"
                                            min="0"
                                            onChange={(e) => setHomeScore(Number(e.target.value))}
                                            className="w-16 p-2 border border-gray-300 rounded text-center"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <span className="text-lg font-bold">vs</span>
                                    </div>

                                    <div className="text-center w-1/3">
                                        <p className="text-sm mb-1">{match.awayTeam.name}</p>
                                        <input
                                            type="number"
                                            min="0"
                                            onChange={(e) => setAwayScore(Number(e.target.value))}
                                            className="w-16 p-2 border border-gray-300 rounded text-center"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                        onClick={handleMakePrediction}
                                    >
                                        Confirmar Prediccion
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <div className="text-center">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

interface MatchesToBetProps {
  pollaId: number;
  matches: Match[];
}

const MatchesToBet = ({ pollaId, matches }: MatchesToBetProps) => {
    return (
        <div className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {matches.map((match, index) => (
                    <MatchCard key={index} matchProps={{ pollaId: String(pollaId), match }} />
                ))}
            </div>
        </div>
    );
};

export default MatchesToBet;