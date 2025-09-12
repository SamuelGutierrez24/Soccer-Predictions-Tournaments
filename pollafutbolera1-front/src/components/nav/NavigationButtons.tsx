"use client";
import React from "react";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  formData: any;
  handleCreatePolla: () => void;
  isEdit?: boolean;
}

export function NavigationButtons({
  onNext,
  onPrevious,
  currentStep,
  formData,
  handleCreatePolla,
  isEdit = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between w-full mt-4 mb-8">
      {currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="px-6 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Anterior
        </button>
      ) : (
        <div></div>
      )}

      {currentStep < 3 ? (
        <button
          onClick={onNext}
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Siguiente
        </button>
      ) : (
        <button
          onClick={handleCreatePolla}
          className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          {isEdit ? "Actualizar Polla" : "Crear Polla"}
        </button>
      )}
    </div>
  );
}
