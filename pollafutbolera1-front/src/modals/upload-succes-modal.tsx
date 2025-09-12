// src/components/modals/UploadSuccessModal.tsx
import React from "react";
import { motion } from "framer-motion";

interface UploadSuccessModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const UploadSuccessModal: React.FC<UploadSuccessModalProps> = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center mt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-gray-200"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-2">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Usuarios Cargados con Éxito
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cerrar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ver usuarios precargados
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadSuccessModal;
