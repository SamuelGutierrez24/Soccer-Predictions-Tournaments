import React from "react";
import { Button } from "../ui/button";

interface JoinRequestRowProps {
  userName: string;
  status: "pending" | "rejected" | "accepted";
  onAccept: () => void;
  onReject: () => void;
}

const getStatusText = (status: string) => {
  const statusMap = {
    pending: "Pendiente",
    rejected: "Rechazado",
    accepted: "Aceptado"
  };
  return statusMap[status as keyof typeof statusMap];
};

const getStatusColor = (status: string) => {
  const colorMap = {
    pending: "text-yellow-600",
    rejected: "text-red-600",
    accepted: "text-green-600"
  };
  return colorMap[status as keyof typeof colorMap];
};

export const JoinRequestRow: React.FC<JoinRequestRowProps> = ({
  userName,
  status,
  onAccept,
  onReject
}) => {
  const isActionable = status === "pending";

  return (
    <div className="grid grid-cols-[0.5fr_0.5fr_0.7fr] px-[20px] py-1.5 border-b-[0.4px] border-b-[rgba(0,0,0,0.4)] border-solid max-md:grid-cols-[1fr_1fr] max-md:gap-2.5 max-md:p-2.5 max-sm:grid-cols-[1fr] max-sm:gap-[5px] max-sm:p-2 items-center text-center">
      <div className="text-xs font-semibold text-[#202224] opacity-80 truncate">
        {userName}
      </div>
      <div className={`text-xs font-semibold ${getStatusColor(status)} truncate`}>
        {getStatusText(status)}
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onAccept}
          disabled={!isActionable}
          variant="default"
          className="bg-[#34A853] hover:bg-[#2d924a] disabled:bg-gray-300 disabled:cursor-not-allowed w-20 text-xs py-1"
        >
          Aceptar
        </Button>
        <Button
          onClick={onReject}
          disabled={!isActionable}
          variant="default"
          className="bg-[#DC2626] hover:bg-[#b91c1c] disabled:bg-gray-300 disabled:cursor-not-allowed w-20 text-xs py-1"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
}
