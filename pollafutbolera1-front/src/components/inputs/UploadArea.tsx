"use client";
import * as React from "react";

interface UploadAreaProps {
  file: File | null;
  setFile: (file: File | null) => void;
  maxSizeMB?: number; // Optional prop with default value
  existingImageUrl?: string; // Add prop for existing image URL
}

export function UploadArea({ file, setFile, maxSizeMB = 5, existingImageUrl }: UploadAreaProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (existingImageUrl) {
      // Use the existing image URL as the preview
      setPreview(existingImageUrl);
    } else {
      setPreview(null);
    }
  }, [file, existingImageUrl]);

  const validateFileSize = (file: File): boolean => {
    if (file.size > maxSizeBytes) {
      alert(`La imagen no debe superar los ${maxSizeMB}MB. Tu archivo es de ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
      return false;
    }
    return true;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      if (validateFileSize(droppedFile)) {
        setFile(droppedFile);
      }
    } else {
      alert("Solo se permiten archivos de imagen.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      if (validateFileSize(selectedFile)) {
        setFile(selectedFile);
      }
      
      // Reset the input value to allow selecting the same file again if needed
      event.target.value = '';
    } else if (selectedFile) {
      alert("Solo se permiten archivos de imagen.");
      event.target.value = '';
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <section
        className={`flex flex-col items-center justify-center p-6 mt-10 max-w-full text-xs tracking-normal bg-white rounded-lg border ${file || (existingImageUrl && !file) ? 'border-green-500' : 'border-black border-dashed'} w-[600px] max-md:px-5 mx-auto`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
    >
        {!file && !existingImageUrl ? (
          <>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9f0994ecc0c042a49fa6850af9739d2b94f47be65eab28d3e67b96ad1280e9e?placeholderIfAbsent=true"
                alt="Icono de carga"
                className="object-contain self-center aspect-square w-[42px]"
            />
            <div className="flex flex-col items-center mt-3 w-full max-md:max-w-full">
                <p className="gap-1 self-stretch w-full text-sm leading-none text-neutral-950 max-md:max-w-full text-center">
                Arrastra tu imagen para comenzar a subir
                </p>
                <div className="flex gap-3 items-center mt-2 max-w-full text-center whitespace-nowrap text-neutral-500 w-[201px]">
                    <div className="flex flex-1 shrink self-stretch my-auto w-20 h-0 basis-0 bg-neutral-200" />
                    <span className="self-stretch my-auto">O</span>
                    <div className="flex flex-1 shrink self-stretch my-auto w-20 h-0 basis-0 bg-neutral-200" />
                </div>
                <div className="flex items-start mt-2 font-semibold text-blue-700">
                    <label className="gap-2 self-stretch px-3 py-1.5 bg-white rounded-lg border border-sky-700 border-solid cursor-pointer">
                        Buscar archivos
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="object-contain w-48 h-48 border border-solid border-gray-300 rounded"
              />
            )}
            <div className="mt-4 text-center">
              {file ? (
                <>
                  <p className="text-sm text-neutral-950">Archivo seleccionado:</p>
                  <p className="text-sm text-neutral-950 font-semibold">{file.name}</p>
                  <p className="text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</p>
                </>
              ) : existingImageUrl ? (
                <>
                  <p className="text-sm text-neutral-950">Imagen actual:</p>
                  <p className="text-sm text-green-600 font-semibold">La imagen se mantendrá si no seleccionas una nueva</p>
                </>
              ) : null}
            </div>
            <div className="flex gap-3 mt-4">
              <label className="gap-2 px-3 py-1.5 bg-white rounded-lg border border-sky-700 border-solid cursor-pointer text-blue-700 font-semibold">
                {file || existingImageUrl ? "Cambiar archivo" : "Seleccionar archivo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {(file || existingImageUrl) && (
                <button 
                  onClick={handleClearFile}
                  className="px-3 py-1.5 bg-white rounded-lg border border-red-500 border-solid text-red-500 font-semibold"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        )}
    </section>
  );
}