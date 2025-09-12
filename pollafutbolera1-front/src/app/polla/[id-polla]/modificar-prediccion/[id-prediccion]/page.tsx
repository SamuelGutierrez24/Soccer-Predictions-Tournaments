'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { pollaService } from '@/src/apis';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import { AlertDialog } from "@/src/components/ui/alert-dialog";
import { useCurrentUser } from '@/src/hooks/auth/userCurrentUser';

// Import our custom components
import MatchDisplay from '@/src/components/polla/MatchDisplay';
import ScoreInputGroup from '@/src/components/polla/ScoreInputGroup';
import ConfirmationDialog from '@/src/components/polla/ConfirmationDialog';
import { MatchBet } from '@/src/interfaces/polla';

function ModificarPrediccionPage() {
    const router = useRouter();
    const params = useParams();
    const idPolla = params['id-polla'] as string;
    const idPrediccion = params['id-prediccion'] as string;
    const { user } = useCurrentUser();

    const [matchBet, setMatchBet] = useState<MatchBet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [homeScore, setHomeScore] = useState<number | string>('');
    const [awayScore, setAwayScore] = useState<number | string>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [successDialogMessage, setSuccessDialogMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        if (!idPrediccion) return;
        if (!user) return; // Wait until user is loaded

        const fetchMatchBet = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await pollaService.getMatchBetById(idPrediccion);
                setMatchBet(response.data);
                setHomeScore(response.data.homeScore);
                setAwayScore(response.data.awayScore);
            } catch (err) {
                console.error("Error fetching match bet:", err);
                setError("No se pudo cargar la predicción. Inténtalo de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchMatchBet();
    }, [idPrediccion, user]);

    const handleUpdate = async () => {
        if (matchBet === null || homeScore === '' || awayScore === '') {
            setError("Por favor ingresa ambos marcadores.");
            return;
        }

        const numHomeScore = Number(homeScore);
        const numAwayScore = Number(awayScore);

        if (isNaN(numHomeScore) || isNaN(numAwayScore) || numHomeScore < 0 || numAwayScore < 0) {
            setError("Los marcadores deben ser números positivos.");
            return;
        }

        setIsUpdating(true);
        setError(null);
        try {
            await pollaService.updateMatchBet(idPrediccion, numHomeScore, numAwayScore);
            setSuccessDialogMessage("Predicción actualizada correctamente.");
            setShowSuccessDialog(true);
        } catch (err) {
            console.error("Error updating match bet:", err);
            setError("No se pudo actualizar la predicción. Inténtalo de nuevo.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            await pollaService.deleteMatchBet(idPrediccion, user?.accessToken || '');
            setSuccessDialogMessage("Predicción eliminada correctamente.");
            setShowSuccessDialog(true);
        } catch (err) {
            console.error("Error deleting match bet:", err);
            setError("No se pudo eliminar la predicción. Inténtalo de nuevo.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSuccessDialogClose = () => {
        setShowSuccessDialog(false);
        router.push(`/polla/${idPolla}/hacer-prediccion-fase-grupos`);
    };

    if (loading) {
        return (
            <div className='w-screen min-h-screen flex flex-col'>
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-12 w-12 rounded-full" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </CardFooter>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    if (error && !matchBet) { 
        return (
            <div className='w-screen min-h-screen flex flex-col'>
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardHeader>
                            <CardTitle>Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">{error}</p>
                            <Button onClick={() => router.back()} className="mt-4">Volver</Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    if (!matchBet) {
        return (
            <div className='w-screen min-h-screen flex flex-col'>
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardHeader>
                            <CardTitle>Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">No se encontró la predicción.</p>
                            <Button onClick={() => router.back()} className="mt-4">Volver</Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <Navbar />
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader className="text-center">
                        <CardTitle>Modificar Predicción</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Use the MatchDisplay component */}
                        <MatchDisplay match={matchBet.match} />

                        {/* Use the ScoreInputGroup component */}
                        <ScoreInputGroup 
                            homeTeamName={matchBet.match.homeTeam.name}
                            awayTeamName={matchBet.match.awayTeam.name}
                            homeScore={homeScore}
                            awayScore={awayScore}
                            onHomeScoreChange={setHomeScore}
                            onAwayScoreChange={setAwayScore}
                            disabled={isUpdating || isDeleting}
                        />

                        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button 
                            variant="outline" 
                            onClick={() => router.push(`/polla/${idPolla}/hacer-prediccion-fase-grupos`)}
                            disabled={isUpdating || isDeleting || showSuccessDialog}
                        >
                            Volver
                        </Button>

                        <div className="flex space-x-2">
                            <Button 
                                variant="destructive" 
                                disabled={isUpdating || isDeleting || showSuccessDialog}
                                onClick={() => setShowDeleteConfirmation(true)}
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </Button>

                            <Button 
                                onClick={handleUpdate} 
                                disabled={isUpdating || isDeleting || showSuccessDialog}
                            >
                                {isUpdating ? 'Actualizando...' : 'Actualizar Predicción'}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </main>
            <Footer />

            {/* Delete confirmation dialog */}
            <ConfirmationDialog
                open={showDeleteConfirmation}
                onOpenChange={setShowDeleteConfirmation}
                title="¿Estás seguro?"
                description="Esta acción no se puede deshacer. Se eliminará permanentemente tu predicción."
                actionLabel={isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                onAction={handleDelete}
                isLoading={isDeleting}
            />

            {/* Success dialog */}
            <ConfirmationDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                title="Éxito"
                description={successDialogMessage}
                actionLabel="OK"
                onAction={handleSuccessDialogClose}
            />
        </div>
    );
}

export default ModificarPrediccionPage;
