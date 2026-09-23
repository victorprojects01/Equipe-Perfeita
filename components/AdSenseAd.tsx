import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSenseAdProps {
  className?: string;
  slot?: string;
  clientId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  minHeight?: number | string;
}

const DEFAULT_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID?.trim() || 'ca-pub-6239237268971394';
const DEFAULT_SLOT = import.meta.env.VITE_ADSENSE_SLOT?.trim() || '2219850050';

/**
 * Componente oficial de anúncio Google AdSense, em total conformidade
 * com as políticas do AdSense (marcação exclusiva "PUBLICIDADE", prevenção
 * de cliques acidentais, prevenção de layout shift e compatibilidade SPA).
 */
export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  className = '',
  slot = DEFAULT_SLOT,
  clientId = DEFAULT_CLIENT_ID,
  format = 'auto',
  responsive = true,
  minHeight = 280,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;

    // Reseta caso o elemento mude
    requested.current = false;

    const requestAd = () => {
      if (requested.current) return;
      if (!element.isConnected) return;

      // Se o AdSense já preencheu ou está processando este elemento
      if (element.getAttribute('data-adsbygoogle-status') || element.children.length > 0) {
        requested.current = true;
        return;
      }

      // AdSense requer largura calculada maior que zero para blocos responsivos
      if (element.getBoundingClientRect().width === 0) {
        return;
      }

      requested.current = true;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (error) {
        console.warn('AdSense notice:', error);
        setAdBlocked(true);
      }
    };

    // Timer de tolerância para verificar se o script do AdSense está carregado
    const timeout = setTimeout(() => {
      if (!window.adsbygoogle && typeof window !== 'undefined') {
        // Possível bloqueador de anúncios ativo
        setAdBlocked(true);
      }
    }, 2000);

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(requestAd) : null;
    observer?.observe(element);

    window.addEventListener('resize', requestAd);
    requestAd();

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
      window.removeEventListener('resize', requestAd);
    };
  }, [slot, clientId]);

  return (
    <aside
      aria-label="Publicidade"
      className={`w-full my-8 flex flex-col items-center select-none ${className}`}
    >
      {/* Rótulo estritamente em conformidade com as diretrizes do Google AdSense */}
      <div className="w-full flex items-center justify-between px-2 mb-2">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
          Publicidade
        </span>
        <span className="text-[9px] text-slate-600 font-medium">Google AdSense</span>
      </div>

      <div
        className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 relative shadow-inner"
        style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minWidth: '250px' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {adBlocked && (
          <div className="text-center py-4 px-6 text-slate-500 text-xs">
            <p className="font-semibold text-slate-400 mb-1">Espaço Reservado para Publicidade</p>
            <p className="text-[11px] text-slate-600">
              Os anúncios ajudam a manter a ferramenta Equipe Perfeita 100% gratuita.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
