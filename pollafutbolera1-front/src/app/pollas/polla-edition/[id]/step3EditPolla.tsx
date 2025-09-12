'use client';
import React,{ useEffect} from "react";
import { useUpdatePollaContext } from "../../../../context/updatePolla";
import { FileUpload } from "../../../../components/ui/file-upload";
import { Progress } from "../../../../components/ui/progress";

import { pollaService } from "@/src/apis";

interface Props {
    params: { id: string }
}

function Step3EditPolla({ onSubmit, params }: { onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>; params: Props['params'] }) {

    /*
    interface FormErrors{
        awardTitle?: string[];
        awardDescription?: string[];
        awardImage?: string[];
        _form: string[];
    }*/

    const {
        prevStep,
        awardTitle,
        setAwardTitle,
        awardDescription,
        setAwardDescription,
        awardImage,
        setAwardImage,
        //rewardId,
        setRewardId,
        //position,
        setPosition,
    } = useUpdatePollaContext();

    //const [isError, setIsError] = React.useState(false);
    //const [polla, setPolla] = useState<Polla>()

    useEffect(() => {
        const fetchData = async () => {
            const resposePolla = await pollaService.getPollaById(params?.id);

            const sortedRewards = [...resposePolla.rewards].sort((a, b) => a.position - b.position);
            setAwardTitle([sortedRewards[0].name, sortedRewards[1].name, sortedRewards[2].name]);
            setAwardDescription([sortedRewards[0].description, sortedRewards[1].description, sortedRewards[2].description]);
            setAwardImage([sortedRewards[0].image, sortedRewards[1].image, sortedRewards[2].image]);
            setPosition([sortedRewards[0].position, sortedRewards[1].position, sortedRewards[2].position]);
            setRewardId([sortedRewards[0].id, sortedRewards[1].id, sortedRewards[2].id]);
        }
        fetchData();
    }, []);

    return (
        <div className='space-y-8 h-full'>
            <div className='space-y-2'>
                <p className='text-3xl ml-20'>Configuracion de premios</p>
                <hr className="w-[90%] mx-auto" />
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-6 max-w-xl mx-auto items-center">

                <Progress value={100} max={3} className="mb-6" />

                <div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-center">Premio primer puesto</p>
                        <p className="text-center text-gray-600">Ingrese información del premio para el primer puesto</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className="space-y-2">
                            <label htmlFor="awardTitle1">Titulo</label>
                            <input
                                type="text"
                                id="awardTitle"
                                name="awardTitle"
                                value={awardTitle[0]}
                                onChange={(e) => setAwardTitle([e.target.value, awardTitle[1], awardTitle[2]])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="awardDescription1"> Descripción </label>
                            <input
                                type="text"
                                id="awardDescription"
                                name="awardDescription"
                                value={awardDescription[0]}
                                onChange={(e) => setAwardDescription([e.target.value, awardDescription[1], awardDescription[2]])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        
                    </div>
                    <div className="text-center">
                        <label htmlFor="awardImage1">Imagen del premio</label>
                        <FileUpload onChange={(files) => setAwardImage([files[0], awardImage[1], awardImage[2]])} />
                    </div>
                    <hr className="w-[90%] mx-auto border-t-2 border-black" />
                </div>
                <div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-center">Premio segundo puesto puesto</p>
                        <p className="text-center text-gray-600">Ingrese información del premio para el segundo puesto</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className="space-y-2">
                            <label htmlFor="awardTitle1">Titulo</label>
                            <input
                                type="text"
                                id="awardTitle"
                                name="awardTitle"
                                value={awardTitle[1]}
                                onChange={(e) => setAwardTitle([awardTitle[0], e.target.value, awardTitle[2]])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="awardDescription1"> Descripción </label>
                            <input
                                type="text"
                                id="awardDescription"
                                name="awardDescription"
                                value={awardDescription[1]}
                                onChange={(e) => setAwardDescription([awardDescription[0], e.target.value, awardDescription[2]])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        
                    </div>
                    <div className="text-center">
                        <label htmlFor="awardImage1">Imagen del premio</label>
                        <FileUpload onChange={(files) => setAwardImage([awardImage[0], files[0], awardImage[2]])} />
                    </div>
                    <hr className="w-[90%] mx-auto border-t-2 border-black" />
                </div>
                <div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-center">Premio tercer puesto puesto</p>
                        <p className="text-center text-gray-600">Ingrese información del premio para el tercer puesto</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className="space-y-2">
                            <label htmlFor="awardTitle1">Titulo</label>
                            <input
                                type="text"
                                id="awardTitle"
                                name="awardTitle"
                                value={awardTitle[2]}
                                onChange={(e) => setAwardTitle([awardTitle[0], awardTitle[1], e.target.value])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="awardDescription1"> Descripción </label>
                            <input
                                type="text"
                                id="awardDescription"
                                name="awardDescription"
                                value={awardDescription[2]}
                                onChange={(e) => setAwardDescription([awardDescription[0], awardDescription[1], e.target.value])}
                                className="border border-gray-300 rounded-xl w-full p-4"
                            />
                        </div>
                        
                    </div>
                    <div className="text-center">
                        <label htmlFor="awardImage1">Imagen del premio</label>
                        <FileUpload onChange={(files) => setAwardImage([awardImage[0], awardImage[1], files[0]])} />
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
                        onClick={onSubmit}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md max-w-xl font-medium hover:bg-blue-900"
                    >
                        Actualizar
                    </button>
                </div>
            </div>
            
        </div>
    )

}

export default Step3EditPolla;