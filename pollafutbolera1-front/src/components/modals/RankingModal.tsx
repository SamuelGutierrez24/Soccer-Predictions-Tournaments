'use client'
import { pollaService } from "@/src/apis";
import { Polla } from "@/src/interfaces/polla";
import { UserScore } from "@/src/interfaces/user_scores.interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RankingModalProps {
    isOpen: boolean;
    onClose: () => void;
    polla: Polla | null;
}

  
export const RankingModal: React.FC<RankingModalProps> = ({ isOpen, onClose, polla }) => {
    
    const Router = useRouter();
    const [pollaData, setPollaData] = useState<UserScore[]>([]);

    useEffect(() => {
        const fetchPollaData = async () => {
            if (polla !== null) {
                const response = await pollaService.finishPolla(polla.id);
                console.log("Polla data:", response);
                setPollaData(response);
            } else {
            }
        }

        fetchPollaData()

    },[polla])

    const handleClose = () => {
      onClose();
      Router.push('/admin')
    }
    
    if (!isOpen){ 
        return null
    };
  
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto relative">
          <button 
            className="absolute top-3 right-3 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </button>
          
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Resultados Finales</h2>
            <p className="text-gray-600">Torneo: {'Torneo'}</p>
          </div>
          
          <div className="w-full bg-blue-100 rounded-lg pb-6">
            
            <div className="flex justify-center items-end mb-6 pt-10 px-6">
              <div className="flex flex-col items-center mr-4">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center overflow-hidden mb-1">
                    <span className="text-xl">{'😀'}</span>
                  </div>
                  <p className="text-xs text-center font-semibold">{pollaData?.[1].user?.nickname}</p>
                </div>
                <div className="bg-blue-600 text-white font-bold text-4xl w-24 h-24 flex items-center justify-center rounded-t-lg">
                  2
                </div>
              </div>
  
              <div className="flex flex-col items-center z-10">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-1 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="text-xl">👑</span>
                    </div>
                    <div className="w-full h-full bg-green-200 flex items-center justify-center">
                      <span className="text-xl">{'😀'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-center font-semibold">{pollaData?.[0].user.nickname}</p>
                </div>
                <div className="bg-blue-700 text-white font-bold text-4xl w-28 h-32 flex items-center justify-center rounded-t-lg">
                  1
                </div>
              </div>
  
              
              <div className="flex flex-col items-center ml-4">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center overflow-hidden mb-1">
                    <span className="text-xl">{'😀'}</span>
                  </div>
                  <p className="text-xs text-center font-semibold">{pollaData?.[2].user?.nickname}</p>
                </div>
                <div className="bg-blue-500 text-white font-bold text-4xl w-24 h-20 flex items-center justify-center rounded-t-lg">
                  3
                </div>
              </div>
            </div>
  
            
            <div className="px-6 space-y-2">
              {pollaData?.slice(3).map((userScore, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center">
                    <span className="text-gray-500 font-medium w-6">{index+4}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2 overflow-hidden">
                      <span className="text-lg">{'😀'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{userScore?.user.nickname}</p>
                      <p className="text-xs text-gray-500">{userScore.scores} puntos</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t flex justify-center">
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
};
  
