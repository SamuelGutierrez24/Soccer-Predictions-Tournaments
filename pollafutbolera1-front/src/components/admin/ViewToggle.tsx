import * as React from 'react';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BusinessIcon from '@mui/icons-material/Business';
import SportsIcon from '@mui/icons-material/Sports';

interface ViewToggleProps {
  showPolls: boolean;
  isLoading: boolean;
  handleToggleView: () => void;
}

export default function ViewToggle({ showPolls, isLoading, handleToggleView }: ViewToggleProps) {
  return (
    <div className="flex justify-center mb-8 animate-slide-up">
      <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography 
            sx={{ 
              fontWeight: showPolls ? 700 : 400, 
              color: showPolls ? '#2563EB' : '#4B5563',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '1rem',
              backgroundColor: showPolls ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
            }}
          >
            <SportsIcon sx={{ mr: 0.7, verticalAlign: 'middle', fontSize: '1.2rem' }} />
            Pollas
          </Typography>
          <Switch 
            checked={!showPolls} 
            onChange={handleToggleView}
            disabled={isLoading}
            inputProps={{ 'aria-label': 'toggle between polls and companies' }}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#E11D48',
                '&:hover': {
                  backgroundColor: 'rgba(225, 29, 72, 0.1)',
                },
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#FB7185',
                opacity: 0.9,
              },
              '& .MuiSwitch-switchBase': {
                color: '#2563EB',
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                },
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#93C5FD',
                opacity: 0.9,
              },
              '& .Mui-disabled': {
                opacity: 0.4,
              }
            }}
          />
          <Typography 
            sx={{ 
              fontWeight: !showPolls ? 700 : 400, 
              color: !showPolls ? '#E11D48' : '#4B5563',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '1rem',
              backgroundColor: !showPolls ? 'rgba(225, 29, 72, 0.1)' : 'transparent'
            }}
          >
            <BusinessIcon sx={{ mr: 0.7, verticalAlign: 'middle', fontSize: '1.2rem' }} />
            Empresas
          </Typography>
        </Stack>
      </div>
    </div>
  );
}
