import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center mb-6">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
      >
        <ArrowBackIcon />
        <span className="ml-1">Volver</span>
      </button>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};
