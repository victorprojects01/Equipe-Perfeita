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
const slot = (import.meta.env.VITE_ADSENSE_SLOT ?? '2219850050').trim();

export const AdSenseAd: React.FC<AdSenseAdProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);

  useEffect(() => {
    const element = adRef.current;
    if (!element || !slot) return;

    const requestAd = () => {
      // Wait for a visible container; avoid duplicate requests in StrictMode.
      if (requested.current || element.getBoundingClientRect().width === 0) return;
      requested.current = true;
      try {
        window.adsbygoogle = window.adsbygoogle || ([] as Record<string, never>[]);
        window.adsbygoogle.push({});
      } catch (error) {
        console.warn('Não foi possível inicializar o anúncio AdSense:', error);
      }
    };

    const observer = new ResizeObserver(requestAd);
    observer.observe(element);
    requestAd();
    return () => observer.disconnect();
  }, []);

  if (!slot) return null;

  return (
    <aside aria-label="Publicidade" className={`w-full min-w-0 my-4 ${className}`}>
      <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-slate-500">Publicidade</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: 100 }}
        data-ad-client="ca-pub-6239237268971394"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
