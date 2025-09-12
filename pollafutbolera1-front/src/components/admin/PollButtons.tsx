import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface PollButtonsProps {
  handleCreatePoll: () => void;
  handleLoadUsers: () => void;
  handleInviteUsers: () => void;
}

export function PollButtons({ 
  handleCreatePoll, 
  handleLoadUsers, 
  handleInviteUsers 
}: PollButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleCreatePoll}
        sx={{ 
          backgroundColor: '#1E40AF',
          '&:hover': { backgroundColor: '#1E3A8A' },
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '8px 16px',
          minWidth: '150px'
        }}
      >
        Crear polla
      </Button>
    </div>
  );
}
