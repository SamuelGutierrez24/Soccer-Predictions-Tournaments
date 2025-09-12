"use client";
import React, { useState, useCallback, useRef } from "react";
import { PreloadUserApi } from "@/src/apis/preloadUser.api";
import { useCompanyFromCookies } from "@/src/hooks/user/useCompanyFromCookies";
import UploadSuccessModal from "@/src/modals/upload-succes-modal";
import UploadErrorModal from "@/src/modals/upload-error-modal";
import { InvalidUser } from "@/src/interfaces/invalid-preloaded-user.interface";
import { PreloadedUserResponse } from "@/src/interfaces/preload-validation.interface";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // al inicio del archivo

const service = new PreloadUserApi(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/pollafutbolera/"
);

export function FileUploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validUsers, setValidUsers] = useState<any[]>([]);
  const [invalidUsers, setInvalidUsers] = useState<InvalidUser[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const company = useCompanyFromCookies();
  const params = useParams();
  const pollaId = Number(params.pollaId);
  const router = useRouter(); 

  const handleNextClick = async () => {
    if (!selectedFile) {
      setError("Por favor selecciona un archivo primero");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      if (!company) throw new Error("No se encontró el companyId en la cookie");

      if (!pollaId || isNaN(pollaId)) {
        throw new Error("No se pudo extraer la pollaId de la URL");
      }

      const response: PreloadedUserResponse = await service.preloadUsers(selectedFile, pollaId, company);

      if ((response as any).error) {
        throw new Error("Error del servidor");
      }

      if (response.invalidUsers.length === 0) {
        setShowSuccessModal(true);
      } else {
        setValidUsers(response.validUsers);
        setInvalidUsers(response.invalidUsers);
        setShowErrorModal(true);
      }
    } catch (err: any) {
      console.error("Error al procesar archivo:", err);

      let message = "Error desconocido";

      if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === "string") {
          message = errorData;
        } else if (typeof errorData === "object") {
          const firstKey = Object.keys(errorData)[0];
          message = errorData[firstKey] || firstKey;
        }
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/csv",
      "text/x-csv",
    ];
    return (
      validTypes.includes(file.type) ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".csv")
    );
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        setError("Solo se permiten archivos XLS, XLSX o CSV");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        setError("Solo se permiten archivos XLS, XLSX o CSV");
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-2 text-left">Añadir Usuarios a la polla</h1>
      <hr className="mb-6" /> */}

      <div className="bg-white rounded-lg shadow-sm p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Subir Archivo</h2>
        </section>

        <section className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
            } ${selectedFile ? "border-green-500" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2354E6]" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">Arrastra tu archivo aquí</p>

            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-500 text-sm">o</span>
              <button
                type="button"
                className="text-blue-600 underline text-sm hover:text-blue-800"
                onClick={handleBrowseClick}
              >
                Buscar archivos
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".xls,.xlsx,.csv"
            />

            {selectedFile && (
              <div className="mt-4 p-2 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  <span className="text-sm">{selectedFile.name}</span>
                  <span className="block text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button onClick={removeFile} className="text-red-500 hover:text-red-700 text-sm">
                  Eliminar
                </button>
              </div>
            )}

            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleNextClick}
            disabled={isProcessing || !selectedFile}
            className={`px-6 py-2 bg-[#3749A6] text-white rounded-md hover:bg-[#2a3a8a] transition-colors ${
              isProcessing || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? "Procesando..." : "Siguiente"}
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <UploadSuccessModal
          onConfirm={() => {
            setShowSuccessModal(false);
            router.push(`/user/preLoad?pollaId=${pollaId}`);
          }}
          onClose={() => {window.location.reload(); }}
        />
      )}
      {showErrorModal && (
        <UploadErrorModal
          invalidUsers={invalidUsers}
          validCount={validUsers.length}
          onClose={() => {window.location.reload();}
          }
          onViewPreloadedUsers={() => router.push(`/user/preLoad?pollaId=${pollaId}`)}

        />
      )}
    </div>
  );
}
