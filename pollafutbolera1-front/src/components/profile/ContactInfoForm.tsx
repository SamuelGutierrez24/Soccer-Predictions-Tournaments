import React from 'react';

interface ContactInfoFormProps {
  profileData: {
    mail: string;
    phoneNumber: string;
  };
  errors: {
    mail: string;
    phoneNumber: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  profileData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="col-span-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h3>

      <div className="mb-4">
        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={profileData.mail}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${errors.mail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.mail && <p className="mt-1 text-sm text-red-600">{errors.mail}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
      </div>
    </div>
  );
};
