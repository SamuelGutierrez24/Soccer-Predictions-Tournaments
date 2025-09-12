import React, { useState } from 'react';
import NotificationPreferencesForm, { NotificationPreferences } from '@/src/components/profile/NotificationPreferencesForm';

interface NotificationPreferencesButtonProps {
  currentPreferences: NotificationPreferences;
  onSave: (prefs: NotificationPreferences) => Promise<void>;
}

const NotificationPreferencesButton: React.FC<NotificationPreferencesButtonProps> = ({ currentPreferences, onSave }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>(currentPreferences);

  // Sync preferences with prop changes
  React.useEffect(() => {
    setPreferences(currentPreferences);
  }, [currentPreferences]);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleSave = async (prefs: NotificationPreferences) => {
    setLoading(true);
    try {
      await onSave(prefs);
      setPreferences(prefs);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="w-full max-w-xl bg-gradient-to-br from-blue-50 via-white to-slate-100 shadow-xl rounded-2xl p-8 border border-blue-100 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          Preferencias de notificación
        </h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 w-full mb-6">
          <div className="flex flex-col items-center">
            {/* Email icon (Heroicons - Envelope) */}
            <svg className={`w-8 h-8 mb-1 ${preferences.enabledEmail ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span className="font-semibold text-gray-700">Email</span>
            <span className={`mt-1 text-sm font-medium ${preferences.enabledEmail ? 'text-green-600' : 'text-red-500'}`}>{preferences.enabledEmail ? 'Activado' : 'Desactivado'}</span>
          </div>
          <div className="flex flex-col items-center">
            {/* SMS icon (Heroicons - Chat Bubble Left Ellipsis) */}
            <svg className={`w-8 h-8 mb-1 ${preferences.enabledSMS ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            <span className="font-semibold text-gray-700">SMS</span>
            <span className={`mt-1 text-sm font-medium ${preferences.enabledSMS ? 'text-green-600' : 'text-red-500'}`}>{preferences.enabledSMS ? 'Activado' : 'Desactivado'}</span>
          </div>
          <div className="flex flex-col items-center">
            {/* WhatsApp official SVG */}
            <svg className={`w-8 h-8 mb-1 ${preferences.enabledWhatsapp ? 'text-green-500' : 'text-gray-400'}`} viewBox="0 0 32 32"><g><path fill="currentColor" d="M16.01 5.993c-5.605 0-10.16 4.555-10.16 10.16c0 1.79.466 3.536 1.353 5.07l-1.44 5.262a1.003 1.003 0 0 0 1.223 1.222l5.262-1.44a10.13 10.13 0 0 0 5.072 1.354h.004c5.605 0 10.16-4.555 10.16-10.16c0-2.715-1.058-5.267-2.98-7.19c-1.924-1.923-4.476-2.978-7.194-2.978zm0 18.32a8.15 8.15 0 0 1-4.152-1.146a1 1 0 0 0-.72-.104l-3.77 1.032l1.033-3.77a1 1 0 0 0-.104-.72A8.13 8.13 0 0 1 7.85 16.15c0-4.517 3.643-8.16 8.16-8.16c2.18 0 4.23.85 5.773 2.393a8.12 8.12 0 0 1 2.387 5.767c0 4.517-3.643 8.16-8.16 8.16zm4.13-6.207c-.226-.113-1.34-.662-1.547-.736c-.207-.075-.358-.113-.509.113c-.151.226-.583.736-.715.888c-.132.151-.264.17-.49.057c-.226-.113-.954-.352-1.818-1.122c-.672-.6-1.126-1.34-1.26-1.566c-.132-.226-.014-.348.099-.46c.102-.102.226-.264.34-.396c.113-.132.151-.226.226-.377c.075-.151.038-.283-.019-.396c-.057-.113-.509-1.228-.697-1.68c-.183-.44-.37-.381-.509-.388c-.132-.006-.283-.007-.434-.007s-.396.057-.604.283c-.207.226-.79.77-.79 1.879c0 1.108.81 2.179.922 2.326c.113.151 1.6 2.444 3.882 3.328c.543.187.966.298 1.297.382c.545.138 1.041.119 1.434.072c.438-.053 1.34-.547 1.528-1.077c.188-.53.188-.983.132-1.077c-.057-.094-.207-.151-.434-.264z"/></g></svg>
            <span className="font-semibold text-gray-700">WhatsApp</span>
            <span className={`mt-1 text-sm font-medium ${preferences.enabledWhatsapp ? 'text-green-600' : 'text-red-500'}`}>{preferences.enabledWhatsapp ? 'Activado' : 'Desactivado'}</span>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-150 text-lg mt-2"
          onClick={handleOpen}
        >
          Editar preferencias
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md">
            <NotificationPreferencesForm
              initialPreferences={preferences}
              onSave={handleSave}
              onCancel={handleClose}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPreferencesButton;
