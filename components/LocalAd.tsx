import React from 'react';
import { LOCAL_ADS, AdConfig } from '../src/constants/ads';

interface LocalAdProps {
  ad?: AdConfig;
  imageName?: string;
  link?: string;
  className?: string;
  label?: string;
}

export const LocalAd: React.FC<LocalAdProps> = ({ 
  ad,
  imageName, 
  link, 
  className = '', 
  label = 'Publicidade' 
}) => {
  // Se um objeto de configuração de anúncio foi passado, usa ele
  const finalAd = ad || (imageName ? { imageName, link: link || '#', label } : LOCAL_ADS[0]);

  // Se não houver imagem na config nem passada via prop, mostra o placeholder
  if (!finalAd || !finalAd.imageName) {
    return (
      <div className={`w-full flex flex-col items-center my-4 ${className}`}>
        <div className="w-full bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 relative min-h-[150px] flex flex-col items-center justify-center overflow-hidden group">
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] absolute top-3 left-4 z-10">
            {label}
          </span>
          <div className="text-center space-y-2">
            <p className="text-slate-500 text-sm font-medium">Espaço Reservado para Publicidade</p>
            <p className="text-slate-600 text-xs">Configure suas imagens e links em <code className="bg-slate-800 px-1 rounded">src/constants/ads.ts</code></p>
          </div>
          
          {/* Efeito visual de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center my-4 ${className}`}>
      <div className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden group">
        <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] absolute top-3 left-4 z-10 drop-shadow-md">
          {finalAd.label || label}
        </span>
        <a href={finalAd.link} target="_blank" rel="noopener noreferrer" className="block w-full">
          <img 
            src={`/images/ads/${finalAd.imageName}`} 
            alt="Publicidade" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      </div>
    </div>
  );
};
