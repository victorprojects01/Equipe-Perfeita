import React, { useState } from 'react';
import { Player } from '../types';
import { Star, Shield, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { AdUnit } from './AdUnit';

interface AdvancedSetupStepProps {
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onFinish: () => void;
  onBack: () => void;
}

export const AdvancedSetupStep: React.FC<AdvancedSetupStepProps> = ({
  players,
  onUpdatePlayers,
  onFinish,
  onBack,
}) => {
  const [error, setError] = useState<string | null>(null);

  const toggleGoalkeeper = (id: string) => {
    const updated = players.map((p) =>
      p.id === id ? { ...p, isGoalkeeper: !p.isGoalkeeper } : p
    );
    onUpdatePlayers(updated);
    setError(null);
  };

  const updateSkill = (id: string, newSkill: number) => {
    const updated = players.map((p) =>
      p.id === id ? { ...p, skill: newSkill } : p
    );
    onUpdatePlayers(updated);
  };

  const handleNext = () => {
    const gkCount = players.filter((p) => p.isGoalkeeper).length;
    if (gkCount !== 2) {
      setError(`Selecione exatamente 2 Goleiros. Atualmente: ${gkCount}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onFinish();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-32 pt-4 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-emerald-900/30 pb-6">
        <div>
           <h2 className="text-4xl font-extrabold text-white uppercase italic tracking-tighter">Ficha Técnica</h2>
           <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mt-1">Defina o nível e as posições</p>
        </div>
        
        {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-black rounded-xl text-sm font-black uppercase tracking-tighter animate-pulse shadow-lg">
                <AlertCircle size={18} />
                {error}
            </div>
        )}
      </div>

      <AdUnit />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`
              relative p-5 rounded-2xl border-2 transition-all duration-300
              ${player.isGoalkeeper 
                ? 'bg-emerald-950 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-900 border-slate-800 hover:border-emerald-800'}
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Jogador</p>
                <h3 className="font-extrabold text-white truncate text-xl uppercase tracking-tighter" title={player.name}>
                  {player.name}
                </h3>
              </div>
              <button
                onClick={() => toggleGoalkeeper(player.id)}
                className={`
                  p-2.5 rounded-full transition-all active:scale-90
                  ${player.isGoalkeeper 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' 
                    : 'bg-slate-800 text-slate-600 hover:text-emerald-400'}
                `}
                title="Goleiro"
              >
                <Shield size={22} fill={player.isGoalkeeper ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Habilidade</span>
                <span className="text-amber-400 font-black text-sm">{player.skill} / 5</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateSkill(player.id, level)}
                    className="flex-1 h-9 rounded-lg bg-slate-800 flex items-center justify-center transition-all hover:bg-slate-700 active:scale-95"
                  >
                    <Star 
                        size={18} 
                        fill={player.skill >= level ? "#fbbf24" : "none"} 
                        className={player.skill >= level ? "text-amber-400" : "text-slate-700"}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {player.isGoalkeeper && (
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shadow-md">
                Goleiro
              </div>
            )}
          </div>
        ))}
      </div>

      <AdUnit format="rectangle" />

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/90 backdrop-blur-xl border-t border-emerald-900/20 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
             <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-4 rounded-full font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest text-xs"
            >
                <ChevronLeft size={20} /> Cancelar
            </button>
            <button
                onClick={handleNext}
                className="flex-1 max-w-xs flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-1 active:translate-y-0"
            >
                Entrar em Campo <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};