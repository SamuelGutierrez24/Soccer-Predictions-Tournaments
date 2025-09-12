// src/components/modals/UploadErrorModal.tsx
import React from "react";
import { motion } from "framer-motion";
import { InvalidUser } from "@/src/interfaces/invalid-preloaded-user.interface";

interface UploadErrorModalProps {
  invalidUsers: InvalidUser[];
  validCount?: number;
  onClose: () => void;
  onViewPreloadedUsers: () => void;
}

const UploadErrorModal: React.FC<UploadErrorModalProps> = ({
  invalidUsers,
  validCount,
  onClose,
  onViewPreloadedUsers,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center mt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-gray-200"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 rounded-full p-2">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Algunos usuarios no se pudieron cargar
        </h2>

        {validCount !== undefined && validCount > 0 && (
          <p className="text-sm text-center text-gray-600 mb-4">
            {validCount} usuario{validCount > 1 ? "s" : ""} fueron cargado
            {validCount > 1 ? "s" : ""} correctamente.
          </p>
        )}

        <div className="max-h-60 overflow-y-auto border rounded p-3 bg-gray-50 text-sm text-red-700 mb-4">
          {invalidUsers.map((user, index) => (
            <div key={index} className="mb-2">
              <strong>Fila {user.lineNumber}:</strong> {user.errorMessage}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cerrar
          </button>
          <button
            onClick={onViewPreloadedUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ver usuarios precargados
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadErrorModal;
