import React from 'react';
import CompanyCard from './CompanyCard';
import { Company } from '@/src/interfaces/company.interface';
import { CircularProgress, Box, Typography } from '@mui/material';

interface ContentSectionProps {
  showPolls: boolean;
  isLoading: boolean;
  pollsData: any[];
  companiesData: Company[];
  onPollaClick: (pollaId: string) => void;
  onEditCompany?: (company: Company) => void;
  onDeleteCompany?: (company: Company) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  showPolls,
  isLoading,
  pollsData,
  companiesData,
  onPollaClick,
  onEditCompany,
  onDeleteCompany
}) => {
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        py={6}
        className="animate-fade-in"
      >
        <CircularProgress 
          size={40} 
          thickness={4}
          sx={{ 
            color: showPolls ? '#2563EB' : '#E11D48',
            mb: 2
          }} 
        />
        <Typography variant="body1" color="text.secondary">
          Cargando 
        </Typography>
      </Box>
    );
  }

  // Show empty state messages if no data
  if (showPolls && pollsData.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        py={8}
        className="bg-gray-50 rounded-xl border border-gray-200 animate-fade-in"
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hay pollas disponibles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea una nueva polla para comenzar
        </Typography>
      </Box>
    );
  }
  
  if (!showPolls && companiesData.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        py={8}
        className="bg-gray-50 rounded-xl border border-gray-200 animate-fade-in"
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hay empresas disponibles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea una nueva empresa para comenzar
        </Typography>
      </Box>
    );
  }

  // Render polls
  if (showPolls) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {pollsData.map((poll, index) => (          <div 
            key={poll.id}            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in relative"
            style={{ 
              animationDelay: `${index * 100}ms`
             }}
            onClick={() => onPollaClick(poll.id)}
          >            <div className="relative overflow-hidden">
              {/* Línea superior - ahora con z-index para que esté siempre visible */}
              <div 
                className="absolute top-0 left-0 w-full h-1 z-10"
                style={{ backgroundColor: poll.color || '#2E7C2E' }}
              ></div>
              {/* Contenedor de imagen separado para evitar que la transformación afecte otros elementos */}
              <div className="overflow-hidden">
                <img 
                  src={poll.imageUrl || "https://placehold.co/400"} 
                  alt={poll.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Esfera de color - también con z-index aumentado */}
              {poll.color && (
                <div 
                  className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white shadow-md z-10"
                  style={{ backgroundColor: poll.color }}
                  title="Color de la polla"
                ></div>
              )}
            </div><div className="p-5">              <h3 className="font-bold text-lg mb-2 text-gray-800">{poll.title}</h3>
              <p className="text-gray-600 line-clamp-2">{poll.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render companies using CompanyCard component
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {companiesData.map((company, index) => (
        <div 
          key={company.id || company.nit}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CompanyCard
            image={company.logo || "https://placehold.co/400"}
            name={company.name}
            address={company.address}
            nit={company.nit}
            contact={company.contact}
            company={company}
            onEdit={onEditCompany}
            onDelete={onDeleteCompany}
          />
        </div>
      ))}
    </div>
  );
};

export default ContentSection;
