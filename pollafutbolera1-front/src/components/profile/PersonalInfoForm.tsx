import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface PersonalInfoFormProps {
  profileData: {
    cedula: string;
    firstName: string;
    lastName: string;
    nickname: string;
  };
  errors: {
    firstName: string;
    lastName: string;
    nickname: string;
  };
  isCheckingNickname: boolean;
  nicknameAvailable: boolean | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  profileData,
  errors,
  isCheckingNickname,
  nicknameAvailable,
  handleInputChange
}) => {
  const errorStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <div className="col-span-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Datos Personales</h3>
      
      <div className="mb-4">
        <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">
          Cédula
        </label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={profileData.cedula}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
        <p className="mt-1 text-sm text-gray-500">La cédula no se puede cambiar</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={profileData.firstName}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Apellido
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={profileData.lastName}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de usuario
        </label>
        <div className="relative">
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={profileData.nickname}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${
              errors.nickname 
                ? 'border-red-500' 
                : nicknameAvailable === true 
                  ? 'border-green-500' 
                  : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {isCheckingNickname && (
            <div className="absolute right-4 top-[50%] transform -translate-y-[30%]">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
          {!isCheckingNickname && nicknameAvailable === true && profileData.nickname.length > 2 && (
            <CheckIcon
              className="absolute right-4 top-[50%] transform -translate-y-[30%] text-green-500"
              style={errorStyle}
            />
          )}
          {!isCheckingNickname && nicknameAvailable === false && profileData.nickname.length > 2 && (
            <CloseIcon
              className="absolute right-4 top-[50%] transform -translate-y-[30%] text-red-500"
              style={errorStyle}
            />
          )}
        </div>
        {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname}</p>}
      </div>
    </div>
  );
};
