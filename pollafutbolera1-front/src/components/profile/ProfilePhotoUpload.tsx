import React from 'react';
import Avatar from '@mui/material/Avatar';

interface ProfilePhotoUploadProps {
  previewUrl: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ 
  previewUrl, 
  onPhotoChange 
}) => {
  return (
    <div className="w-full flex flex-col items-center pb-8 border-b border-gray-200">
      <Avatar 
        src={previewUrl || undefined}
        alt="Profile Photo"
        sx={{ width: 150, height: 150, mb: 3, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
      />
      
      <input
        type="file"
        id="photo"
        accept="image/*"
        className="hidden"
        onChange={onPhotoChange}
      />
      <label
        htmlFor="photo" 
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 cursor-pointer"
      >
        Cambiar foto
      </label>
    </div>
  );
};
