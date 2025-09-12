"use client";

import { getPollasBycompany, useJoinPolla } from "@/src/hooks/polla/usePolla";
import { Polla } from "@/src/interfaces/polla";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getPollaIdsByUserId } from "@/src/hooks/subpolla/useSubpolla";

export default function PollaExploreList() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pollas, setPollas] = useState<Polla[]>([]); // Replace 'any' with your Polla type
    const currentUser = JSON.parse(Cookies.get("currentUser") || '{}');
    
    

    useEffect(() => {
        const fetchPollas = async () => {
            setLoading(true);
            try {
                // Simulate fetching pollas from an API
                getPollasBycompany(currentUser.company).then((response) => {
                    if (response && response.length > 0) {
                        getPollaIdsByUserId(currentUser.userId).then((pollaIds) => {
                        // Filter out pollas that the user has already joined
                        console.log("Pollas before filtering:", response);
                        console.log("Polla IDs to exclude:", pollaIds);
                            response = response.filter((polla: Polla) => !pollaIds.includes(polla.id));
                            setPollas(response);
                        }); 
                    }
                    else {
                        setPollas([]);
                    }
                });
                
            } catch (err: any) {
                setError(err.message || 'Error al cargar las pollas');
            } finally {
                setLoading(false);
            }
        };

        fetchPollas();
    },[]);

    function handleJoinPolla(pollaId?: number) {
        if (pollaId) {
            useJoinPolla(pollaId, currentUser.userId)
                .then(() => {
                    alert("Successfully joined the polla!");
                })
                .catch((err: any) => {
                    console.error("Error joining polla:", err);
                    alert("Failed to join the polla. Please try again.");
                });
            }
        
    }

    return (
        <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Explore Pollas</h1>
            {loading && <p>Loading pollas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {pollas.length === 0 && !loading && <p>No pollas available.</p>}
            <ul className="space-y-4">
                {pollas.map((polla) => (
                    <li key={polla.id} className="bg-white shadow rounded p-2 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                        <img
                            src={polla.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
                            alt={polla.tournament?.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h2 className="text-base font-semibold">{polla.tournament?.name || 'Torneo'}</h2>
                            <p className="text-xs text-gray-600">{polla.tournament?.description || 'No description available'}</p>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors duration-200"
                            onClick={() => handleJoinPolla(polla.id  || undefined)}
                        >
                            Join
                        </button>
                    </li>
                ))}
            </ul>
        </main>
        </div>
    );
    }