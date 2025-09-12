
"use client";

import React, { ReactNode, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalStats: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup al desmontar o cerrar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Manejar tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const onContentClick = (e: MouseEvent) => e.stopPropagation();

  if (!isOpen) return null;

  // Usar portal para renderizar fuera del componente padre
  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[9999] 
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        animate-in fade-in duration-200
        p-4
      "
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div
        onClick={onContentClick}
        className="
          relative w-full max-w-3xl max-h-[90vh] 
          bg-white rounded-xl shadow-2xl
          animate-in zoom-in-95 duration-200
          overflow-hidden
          border border-gray-200
        "
      >
        {/* Header fijo con botón de cerrar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Estadísticas del Partido</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              text-gray-400 hover:text-gray-600 hover:bg-gray-100
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalStats;