import React, { useEffect } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ 
  slot, 
  format = 'auto', 
  className = '', 
  label = 'Publicidade' 
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center my-4 ${className}`}>
      <div className="w-full bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-2 relative min-h-[100px] flex flex-col items-center justify-center">
        <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] absolute top-2 left-4">
          {label}
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-6239237268971394"
          data-ad-slot={slot || ""}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};