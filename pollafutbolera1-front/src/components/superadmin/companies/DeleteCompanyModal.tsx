'use client';

import React, { useState } from 'react';
import { Company } from '../../../interfaces/company.interface';
import { companyApi } from '@/src/apis';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import WarningIcon from '@mui/icons-material/Warning';

interface Props {
  company: Company;
  onClose: () => void;
  onSuccess: () => void;
  onError?: () => void;
}

export default function DeleteCompanyModal({ company, onClose, onSuccess }: Props) {
  const [confirmName, setConfirmName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await companyApi.deleteCompany(company.id);
      toast.success(`Empresa "${company.name}" eliminada correctamente.`);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error al eliminar la empresa. Inténtalo de nuevo.');
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <WarningIcon sx={{ fontSize: 32, color: '#DC2626' }} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Eliminar Empresa
        </h2>

        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded mb-6">
          <p className="font-medium">⚠️ Esta acción es irreversible</p>
          <p className="text-sm mt-1">
            Toda la información relacionada con la empresa <strong>{company.name}</strong> se perderá permanentemente.
          </p>
        </div>

        <p className="mb-2 text-gray-700">
          Para confirmar, escribe el nombre exacto de la empresa:
        </p>
        <p className="font-semibold mb-4 text-red-600">{company.name}</p>

        <input
          type="text"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all duration-200"
          placeholder="Confirma el nombre..."
          autoComplete="off"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmName !== company.name || isDeleting}
            className={`px-5 py-2.5 rounded-lg text-white transition-all duration-200 font-medium flex items-center justify-center min-w-[100px] ${
              confirmName === company.name && !isDeleting
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-300 cursor-not-allowed'
            }`}
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
