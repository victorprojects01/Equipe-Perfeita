import React, { useState, useEffect } from 'react';
import { Users, Dices, ShieldCheck, Trophy } from 'lucide-react';
import { AppMode } from '../types';

interface InputStepProps {
  onNext: (rawNames: string[], mode: AppMode) => void;
}

export const InputStep: React.FC<InputStepProps> = ({ onNext }) => {
  const [text, setText] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    setPlayerCount(lines.length);
    if (lines.length >= 2) setError(null);
  }, [text]);

  const handleNext = (mode: AppMode) => {
    const names = text.split('\n').map((line) => line.trim()).filter((line) => line !== '');
    
    if (names.length < 2) {
      setError('Escalação incompleta! Mínimo de 2 jogadores.');
      return;
    }

    onNext(names, mode);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in py-8 px-4">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 rounded-full mb-2">
          <Trophy className="text-emerald-400" size={32} />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter text-white uppercase italic">
          Equipe <span className="text-emerald-500">Perfeita</span>
        </h1>
        <p className="text-emerald-200/60 font-medium tracking-wide">DIVIDA O ELENCO E COMECE A PARTIDA</p>
      </div>

      {/* Input Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole a lista de convocados...&#10;Ex: Romário&#10;Ronaldo&#10;Zico"
            className="w-full h-72 bg-transparent text-white p-6 focus:outline-none resize-none leading-relaxed placeholder:text-slate-700 font-medium text-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-sm border-t border-emerald-900/30 flex justify-between items-center">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
              <Users size={16} />
              <span>{playerCount} INSCRITOS</span>
            </div>
            <button 
              onClick={() => setText('')}
              className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-tighter transition-colors"
            >
              Limpar Lista
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-100 rounded-xl text-sm font-bold text-center animate-bounce">
          ⚠️ {error}
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => handleNext('BASIC')}
          className="group relative overflow-hidden bg-white text-slate-950 p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-xl font-extrabold uppercase italic leading-none">Sorteio Rápido</h3>
              <p className="text-xs font-bold text-slate-500 mt-2 tracking-tight">ALEATÓRIO E DIRETO</p>
            </div>
            <Dices size={32} className="text-emerald-600" />
          </div>
        </button>

        <button
          onClick={() => handleNext('ADVANCED')}
          className="group relative overflow-hidden bg-emerald-500 text-white p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-xl font-extrabold uppercase italic leading-none">Escalação Elite</h3>
              <p className="text-xs font-bold text-emerald-900 mt-2 tracking-tight">EQUILÍBRIO TÉCNICO</p>
            </div>
            <ShieldCheck size={32} />
          </div>
        </button>
      </div>

      {/* Ad Space */}
      <div className="w-full pt-8 flex flex-col items-center">
          <div className="w-full h-32 md:h-24 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] absolute top-2 left-4">Publicidade</span>
              <div className="text-slate-800 font-bold text-xs">GOOGLE ADSENSE BANNER</div>
          </div>
      </div>
    </div>
  );
};