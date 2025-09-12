"use client";

import { getSubPollasByCreatorUserId, createSubPolla } from '@/src/hooks/subpolla/useSubpolla';


import { useState, useEffect } from 'react';

import Cookies from "js-cookie";
import { SubPolla } from '@/src/interfaces/subpolla.interface';
import { SubPollaButton } from './SubPollaButton';


export function SubPollaNav() {
    const [hasSubpolla, setHasSubpolla] = useState(false);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {

        const hasSubpolla = async () => {
            try{
                setLoading(true);
                const currentUser = Cookies.get("currentUser");
                if (!currentUser) {
                    setHasSubpolla(false);
                    return;
                }
                const userId = JSON.parse(currentUser).userId;
                getSubPollasByCreatorUserId(userId)
                    .then((subpollas) => {
                        if (subpollas && subpollas.length > 0) {
                            setHasSubpolla(true);
                        } else {
                            setHasSubpolla(false);
                        }
                    })
                    .catch(() => {
                        setHasSubpolla(false);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
            catch (error) {
                setHasSubpolla(false);
                setLoading(false);
            }
        }
        hasSubpolla();
        
    }, []);

    const handleCreateSubpolla = () => {
        const currentPolla = Cookies.get("pollaId");
        const currentUser = Cookies.get("currentUser");
        const subPolla: SubPolla = {
            id: undefined, 
            pollaId: currentPolla ? Number(currentPolla) : undefined,
            userId: currentUser ? JSON.parse(currentUser).userId : undefined, 
            isPrivate: false, 
        }
        console.log("SubPolla to create:", subPolla);

        createSubPolla(subPolla)
            .then(() => {
                setHasSubpolla(true);
                window.location.reload();
            })
            .catch((error) => {
                alert("Error al crear la SubPolla");
            })
    };

    return (
            <div className="w-full bg-white  flex flex-col items-center">
                <div>
                        <div className="text-2xl font-bold  mb-6 flex items-center gap-3">
                            <h1 className="w-7 h-7 ">SubPollas</h1>
                        </div>

                        <div className='flex'>
                            {loading ? (
                                <p className="text-gray-500">Cargando...</p>
                            ) : (
                                <>
                                {hasSubpolla ? (
                                    <>
                                        <SubPollaButton text="Ver Solicitudes de union" dir="/subpollas/join-requests" />
                                        
                                    </>
                                ) : (
                                    <>
                                        <SubPollaButton text="Crear SubPolla" onClick={handleCreateSubpolla}/>
                                        
                                    </>
                                )}
                            </>
                            )}
                            <div className="w-1/11"></div>
                            
                            <SubPollaButton text="Explorar SubPollas disponibles" dir="/subpollas/subpollas-list" />
                               
                        </div>
                </div>
            </div>
    );
    }