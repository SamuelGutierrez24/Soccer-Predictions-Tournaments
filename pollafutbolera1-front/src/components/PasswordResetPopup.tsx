import { useState } from "react";
import { XCircle } from "lucide-react"; // Icono de cierre elegante

interface PasswordResetPopupProps {
  onClose: () => void;
}

export default function PasswordResetPopup({ onClose }: PasswordResetPopupProps) {
  const [email, setEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_RESETPASSWORD}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressee: email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al procesar la solicitud");
      }

      setMessageSent(true);
    } catch (error:any) {
      console.error("Error en la solicitud:", error);
      setError(error.message || "Error inesperado, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm p-4">
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl border-4  text-center max-w-sm w-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-red-500 hover:text-red-700">
          <XCircle size={28} />
        </button>

        {messageSent ? (
          <>
            <img
              src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
              alt="Popoya Logo"
              className="mx-auto w-24 mb-3"
            />
            <h2 className="text-xl font-bold text-black">¡Correo Enviado!</h2>
            <p className="text-gray-700 text-sm mb-4">
              Si el correo ingresado está asociado a una cuenta, recibirás un enlace para restablecer tu contraseña.
              <br />
              No olvides revisar tu carpeta de spam.
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300"
            >
              Volver a la página principal
            </button>
          </>
        ) : (
          <>
            <img
              src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png"
              alt="Popoya Logo"
              className="mx-auto w-24 mb-3"
            />
            <h2 className="text-xl font-bold text-black">Recupera tu Contraseña</h2>
            <p className="text-gray-700 text-sm mb-4">
              Ingresa tu correo electrónico asociado a Popoya para recuperar tu cuenta.
            </p>
            <input
              type="email"
              className="w-full p-2 border-2 rounded-lg bg-gray-100 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              className={`mt-4 w-full px-4 py-2 font-bold rounded-lg transition-all duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            {error && <p className="mt-3 text-red-600 font-semibold">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
