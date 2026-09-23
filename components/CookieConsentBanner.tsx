import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

const STORAGE_KEY = 'equipe_perfeita_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyPolicy,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Exibe o banner suavemente após o carregamento inicial
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignora erro se localStorage for bloqueado
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // Ignore
    }
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'essential_only');
    } catch {
      // Ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-slate-900/95 border border-emerald-900/60 p-5 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in text-slate-200"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
          <Cookie size={20} />
        </div>
        <div className="flex-1 text-xs leading-relaxed space-y-2">
          <p className="font-bold text-white text-sm">Privacidade & Cookies</p>
          <p className="text-slate-300">
            Utilizamos cookies e tecnologias similares para garantir o funcionamento do app, melhorar sua experiência
            e exibir anúncios personalizados via <strong>Google AdSense</strong>.
          </p>
          <p>
            Consulte nossa{' '}
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-emerald-400 underline font-semibold hover:text-emerald-300"
            >
              Política de Privacidade
            </button>{' '}
            para detalhes e opções de desativação.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={handleEssentialOnly}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Apenas Essenciais
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
        >
          <Check size={14} /> Aceitar Todos
        </button>
      </div>
    </div>
  );
};
