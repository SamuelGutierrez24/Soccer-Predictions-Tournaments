import * as React from 'react';
import Fade from '@mui/material/Fade';
import { PollButtons } from './PollButtons';
import { CompanyButtons } from './CompanyButtons';

interface AdminHeaderProps {
  showPolls: boolean;
  isLoading: boolean;
  handleCreatePoll: () => void;
  handleLoadUsers: () => void;
  handleInviteUsers: () => void;
  handleCreateCompany: () => void;
}

export default function AdminHeader({ 
  showPolls, 
  isLoading,
  handleCreatePoll, 
  handleLoadUsers, 
  handleInviteUsers,
  handleCreateCompany 
}: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de administrador</h1>
          <p className="text-gray-600">Gestiona empresas y crea pollas</p>
        </div>
        
        {/* Fixed container with consistent width for both button sets */}
        <div style={{ minHeight: '48px', minWidth: '150px' }}>
          {/* Poll buttons with fade transition */}
          <Fade in={showPolls && !isLoading} timeout={500} unmountOnExit>
            <div>
              <PollButtons 
                handleCreatePoll={handleCreatePoll}
                handleLoadUsers={handleLoadUsers}
                handleInviteUsers={handleInviteUsers}
              />
            </div>
          </Fade>
          
          {/* Company button with fade transition */}
          <Fade in={!showPolls && !isLoading} timeout={500} unmountOnExit>
            <div>
              <CompanyButtons 
                handleCreateCompany={handleCreateCompany} 
              />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
