import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AlertNotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  open: boolean;
  onClose: () => void;
}

export const AlertNotification: React.FC<AlertNotificationProps> = ({
  type,
  message,
  open,
  onClose
}) => {
  return (
    <Collapse in={open}>
      <Alert 
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ 
          mb: 2,
          "& .MuiAlert-message": { whiteSpace: "pre-line" } 
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};
