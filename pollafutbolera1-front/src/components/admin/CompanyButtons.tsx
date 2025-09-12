import * as React from 'react';
import Button from '@mui/material/Button';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';

interface CompanyButtonsProps {
  handleCreateCompany: () => void;
  handleEditCompany?: () => void;
}

export function CompanyButtons({ handleCreateCompany, handleEditCompany }: CompanyButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        variant="contained" 
        startIcon={<BusinessIcon />}
        onClick={handleCreateCompany}
        sx={{ 
          backgroundColor: '#E11D48',
          '&:hover': { backgroundColor: '#BE123C' },
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '8px 16px',
          minWidth: '150px'
        }}
      >
        Crear empresa
      </Button>
      
      {handleEditCompany && (
        <Button 
          variant="outlined" 
          startIcon={<EditIcon />}
          onClick={handleEditCompany}
          sx={{ 
            color: '#E11D48',
            borderColor: '#E11D48',
            '&:hover': { 
              borderColor: '#BE123C',
              backgroundColor: 'rgba(225, 29, 72, 0.04)'
            },
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            padding: '8px 16px',
          }}
        >
          Editar empresa
        </Button>
      )}
    </div>
  );
}
