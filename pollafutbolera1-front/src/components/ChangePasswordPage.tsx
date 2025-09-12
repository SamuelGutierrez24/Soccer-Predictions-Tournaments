'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ChangePasswordProps {
  token: string;
}

export default function ChangePassword({ token }: ChangePasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Función para validar la contraseña
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
      errors: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar la nueva contraseña
    const passwordValidation = validatePassword(newPassword);
    
    if (!passwordValidation.isValid) {
      const errorMessages = [];
      if (!passwordValidation.errors.minLength) {
        errorMessages.push("al menos 8 caracteres");
      }
      if (!passwordValidation.errors.hasUpperCase) {
        errorMessages.push("una letra mayúscula");
      }
      if (!passwordValidation.errors.hasLowerCase) {
        errorMessages.push("una letra minúscula");
      }
      if (!passwordValidation.errors.hasNumber) {
        errorMessages.push("un número");
      }
      
      setError(`La contraseña debe tener ${errorMessages.join(", ")}`);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    setError("");
    setSuccess("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CHANGEPASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword
        })
      });
      
      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }
      
      setSuccess("Contraseña actualizada con éxito");
      setNewPassword("");
      setConfirmPassword("");
      setSubmitted(true);
    } catch (error:any) {
      setError(error.message);
    }
  };

  // Obtener el estado de validación para mostrar indicadores visuales
  const passwordValidation = validatePassword(newPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center border border-gray-300">
        <img
          src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
          alt="Popoya Logo"
          className="mx-auto w-24 mb-3"
        />
        <h2 className="text-xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'DM Sans, sans-serif' }}>Cambia tu contraseña</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="w-full p-2 border border-gray-400 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {/* Indicadores de validación */}
              {newPassword && (
                <div className="mt-2 text-xs text-left space-y-1">
                  <div className={`flex items-center ${passwordValidation.errors.minLength ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-1">{passwordValidation.errors.minLength ? '✓' : '✗'}</span>
                    Al menos 8 caracteres
                  </div>
                  <div className={`flex items-center ${passwordValidation.errors.hasUpperCase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-1">{passwordValidation.errors.hasUpperCase ? '✓' : '✗'}</span>
                    Una letra mayúscula
                  </div>
                  <div className={`flex items-center ${passwordValidation.errors.hasLowerCase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-1">{passwordValidation.errors.hasLowerCase ? '✓' : '✗'}</span>
                    Una letra minúscula
                  </div>
                  <div className={`flex items-center ${passwordValidation.errors.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-1">{passwordValidation.errors.hasNumber ? '✓' : '✗'}</span>
                    Un número
                  </div>
                </div>
              )}
            </div>
            <input
              type="password"
              placeholder="Repetir nueva contraseña"
              className="w-full p-2 border border-gray-400 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition font-medium"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Guardar cambios
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Ir a la página principal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
