'use client'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { pollaService } from '@/src/apis'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table"
import { DeleteConfirmModal } from "@/src/components/modals/DeleteModal";
import { RankingModal } from "@/src/components/modals/RankingModal";
import { Polla } from "@/src/interfaces/polla";

const getCurrentUserFromCookies = (): number | null => {
    const userCookie = Cookies.get("currentUser");
    return userCookie ? JSON.parse(userCookie).company : null;
};


function PollaAdminPage() {
    const [user, setUser] = useState<number | null>(getCurrentUserFromCookies)
    const [pollas, setPollas] = useState<Polla[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isRankingModalOpen, setIsRankingModalOpen] = useState<boolean>(false);
    const [selectedPolla, setSelectedPolla] = useState<Polla | null>(null);

    const handleDeleteClick = (polla: Polla) => {
        setSelectedPolla(polla);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!selectedPolla) return;
            
            setIsDeleteModalOpen(false);
            setIsRankingModalOpen(true);
        } catch (error) {
            console.error("Error al finalizar la polla:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (user === null) return;
                console.log("company_id ", user);
                const response = await pollaService.getPollasByCompanyId(user);
                console.log("Pollas: ", response);
                setPollas(response);
            } catch (error) {
                console.error("Error fetching pollas:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="w-full overflow-hidden rounded-md">
            <Table className="w-full">
                <TableHeader className="bg-gray-50 border-b border-gray-200 h-[80]">
                    <TableRow className="font-medium text-gray-700">
                        <TableHead className="py-4 px-6">Fecha de inicio</TableHead>
                        <TableHead className="py-4 px-6">Fecha de fin</TableHead>
                        <TableHead className="py-4 px-6">Torneo</TableHead>
                        <TableHead className="py-4 px-6 text-right">Finalizar polla</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                    <span className="ml-2">Cargando...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : pollas.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                No hay pollas disponibles
                            </TableCell>
                        </TableRow>
                    ) : (
                        pollas.map((polla) => (
                            <TableRow 
                                key={polla.id} 
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <TableCell className="py-4 px-6">{new Date(polla.startDate).toLocaleDateString()}</TableCell>
                                <TableCell className="py-4 px-6">{new Date(polla.endDate).toLocaleDateString()}</TableCell>
                                <TableCell className="py-4 px-6">{polla.tournament.name}</TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <button 
                                        className="bg-red-800 hover:bg-red-900 text-white px-4 py-1 rounded text-sm transition-colors"
                                        onClick={() => {
                                            handleDeleteClick(polla)
                                        }}
                                    >
                                        Finalizar
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <RankingModal
                isOpen={isRankingModalOpen}
                onClose={() => setIsRankingModalOpen(false)}
                polla={selectedPolla}
            />
        </div>
    )
}

export default PollaAdminPage;