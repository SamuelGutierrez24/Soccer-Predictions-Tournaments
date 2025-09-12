// src/components/Modal.tsx
"use client";

import React, { ReactNode, MouseEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const onContentClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50 grid place-items-center
        bg-gray-400/40        
        backdrop-blur-sm      
      "
    >
      <div
        onClick={onContentClick}
        className="
          relative w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto
          bg-white rounded-lg shadow-lg
        "
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
