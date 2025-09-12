import React from 'react';

interface ProfileFormButtonsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ProfileFormButtons: React.FC<ProfileFormButtonsProps> = ({
  isSubmitting,
  onCancel
}) => {
  return (
    <div className="w-full flex justify-end space-x-4 mt-8">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
};
