'use client'
//import React, {use, useState} from 'react';
import { useUpdatePollaContext } from "../../../../context/updatePolla";
import { FileUpload } from '../../../../components/ui/file-upload';
import { Progress } from '../../../../components/ui/progress';
import { Calendar } from "@/src/components/ui/calendar";
import { Polla } from "@/src/interfaces/polla/polla.interface";
import { useEffect, useState } from "react";
import { pollaService } from "@/src/apis";
import { Switch } from "@/src/components/ui/switch";

interface Props {
    params: { id: string }
  }

function Step2EditPolla({params}: Props) {

    /*
    interface FormErrors{
        name?: string[];
        rules?: string[];
        logo?: string[];
        maxTime?: string[];
        _form: string[];
    }*/

    const {
        nextStep,
        prevStep,
        //name,
        //setName,
        setLogo,
        setMaxTime,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isPrivate,
        setIsPrivate,
        setTournament_id,
        setCompany
    } = useUpdatePollaContext();

    //const [isError, setIsError] = React.useState(false);
    const [polla, setPolla] = useState<Polla>()

    useEffect(() => {
            const fetchData = async () => {
                const resposePolla = await pollaService.getPollaById(params?.id);
                setPolla(resposePolla);
                setTournament_id(resposePolla.tournament);
                setCompany(resposePolla.company);
                //setName(resposePolla.name);
                setMaxTime(resposePolla.maxTime);
                setLogo(resposePolla.logo);
                setStartDate(new Date(resposePolla.startDate));
                setEndDate(new Date(resposePolla.endDate));
                setIsPrivate(resposePolla.isPrivate);
            }
            fetchData();
    }, []);

    const handleFileUpload = (files: File[]) => {
        setLogo(files);
      };

    

    return (
        <div className='space-y-8 h-full'>
            <div className='space-y-2'>
                <p className='text-3xl ml-20'>Configuracion de la polla</p>
                <hr className="w-[90%] mx-auto" />
            </div>
            <div className="bg-white rounded-3xl shadow-md p-6 max-w-xl mx-auto">

                <Progress value={66} max={3} className="mb-6" />

                <h2 className="text-left font-bold text-lg mb-6">Datos de la polla</h2>
                
                    <div className="space-y-4">
                        <div className="flex space-x-8">
                            <div>
                            <label htmlFor="starDate">fecha inicial</label>
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                            </div>
                            <div>
                                <label htmlFor="endDate">Fecha finalizacion</label>
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="logo">Logo de la polla</label>
                            <FileUpload onChange={handleFileUpload} />
                        </div>
                        <div >
                            <label htmlFor="maxTime">¿Es privada?</label>
                            <div className='flex space-x-8'>
                            <Switch
                                id="airplane-mode"
                                checked={isPrivate}
                                onCheckedChange={(checked) => setIsPrivate(checked)}
                            />
                            </div>
                            
                        </div>
                        <div className="justify-center align-center flex space-x-8">
                                <button
                                    onClick={prevStep}
                                    className="bg-blue-600 text-white py-2 px-6 max-w-xl rounded-md font-medium hover:bg-blue-900"
                                >
                                    Atras
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md max-w-xl font-medium hover:bg-blue-900"
                                >
                                    Siguiente
                                </button>
                        </div>
                        
                    </div>
                
            </div>
        </div>
    )


}

export default Step2EditPolla;
