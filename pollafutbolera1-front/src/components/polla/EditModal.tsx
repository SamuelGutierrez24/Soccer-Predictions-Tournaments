import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Team } from '@/src/interfaces/polla';


type TournamentPredictionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  currentWinnerTeam: Team | null;
  currentScorerTeam: Team | null;
  onSave: (winnerTeamId: number | null, scorerTeamId: number | null) => void;
};

const TournamentPredictionsModal = ({
  isOpen,
  onClose,
  teams,
  currentWinnerTeam,
  currentScorerTeam,
  onSave
}: TournamentPredictionsModalProps) => {
  const [tempWinnerTeam, setTempWinnerTeam] = useState<number | null>(currentWinnerTeam?.id || null);
  const [tempScorerTeam, setTempScorerTeam] = useState<number | null>(currentScorerTeam?.id || null);

  const handleSave = () => {
    onSave(tempWinnerTeam, tempScorerTeam);
    onClose();
  };

  const handleClose = () => {
    // Resetear valores temporales al cerrar sin guardar
    setTempWinnerTeam(currentWinnerTeam?.id || null);
    setTempScorerTeam(currentScorerTeam?.id || null);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Editar Predicciones del Torneo
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Selector de equipo ganador */}
          <div className="mb-6">
            <p className="text-2xl font-semibold mb-4">Seleccionar equipo ganador</p>
            <Select 
              value={tempWinnerTeam ? String(tempWinnerTeam) : undefined}
              onValueChange={(value) => setTempWinnerTeam(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el equipo ganador" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipos</SelectLabel>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={team.logoUrl} alt={team.name} />
                          <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>{team.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Selector de equipo goleador */}
          <div className="mb-6">
            <p className="text-2xl font-semibold mb-4">Seleccionar equipo goleador</p>
            <Select 
              value={tempScorerTeam ? String(tempScorerTeam) : undefined}
              onValueChange={(value) => setTempScorerTeam(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el equipo goleador" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipos</SelectLabel>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={team.logoUrl} alt={team.name} />
                          <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>{team.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Predicción Summary */}
          {(tempWinnerTeam || tempScorerTeam) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-4 text-center">
                Resumen de Tu Predicción
              </h4>
              
              <div className="space-y-3">
                {tempWinnerTeam && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium text-gray-700">Equipo Ganador:</span>
                    <div className="flex items-center">
                      {teams.find(t => t.id === tempWinnerTeam) && (
                        <>
                          <img
                            src={teams.find(t => t.id === tempWinnerTeam)?.logoUrl}
                            alt={teams.find(t => t.id === tempWinnerTeam)?.name}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-bold text-blue-600">
                            {teams.find(t => t.id === tempWinnerTeam)?.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {tempScorerTeam && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium text-gray-700">Equipo Goleador:</span>
                    <div className="flex items-center">
                      {teams.find(t => t.id === tempScorerTeam) && (
                        <>
                          <img
                            src={teams.find(t => t.id === tempScorerTeam)?.logoUrl}
                            alt={teams.find(t => t.id === tempScorerTeam)?.name}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-bold text-green-600">
                            {teams.find(t => t.id === tempScorerTeam)?.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              ⚠️ Una vez guardados los cambios, deberás recargar la página para ver las actualizaciones reflejadas.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleSave}
              disabled={!tempWinnerTeam || !tempScorerTeam}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentPredictionsModal;