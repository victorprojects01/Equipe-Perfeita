import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { push: (ad: Record<string, never>) => void };
  }
}

interface AdSenseAdProps {
  className?: string;
}

// ad_01 is the default; the deployment environment can override it.
const slot = import.meta.env.VITE_ADSENSE_SLOT?.trim() || '2219850050';

export const AdSenseAd: React.FC<AdSenseAdProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;

    const requestAd = () => {
      // Wait for a visible container; avoid duplicate requests in StrictMode.
      if (requested.current || element.hasAttribute('data-adsbygoogle-status')) return;
      if (!element.isConnected || element.getBoundingClientRect().width === 0) return;
      requested.current = true;
      try {
        window.adsbygoogle = window.adsbygoogle || ([] as Record<string, never>[]);
        window.adsbygoogle.push({});
      } catch (error) {
        console.warn('Não foi possível inicializar o anúncio AdSense:', error);
      }
    };

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(requestAd);
    observer?.observe(element);
    window.addEventListener('resize', requestAd);
    window.addEventListener('load', requestAd);
    requestAd();
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', requestAd);
      window.removeEventListener('load', requestAd);
    };
  }, []);

  return (
    <aside aria-label="Publicidade" className={className} style={{ width: '100%', minWidth: 0, minHeight: 120 }}>
      <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-slate-500">Publicidade</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6239237268971394"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
