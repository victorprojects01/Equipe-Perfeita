import React, { useState } from 'react';
import { Team } from '../types';
import { Shuffle, Copy, Check, ChevronLeft, Shield, UserCog, Share2 } from 'lucide-react';

interface ResultsStepProps {
  teamA: Team;
  teamB: Team;
  mode: 'BASIC' | 'ADVANCED';
  onShuffle: () => void;
  onReset: () => void;
  onBackToSetup?: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({
  teamA,
  teamB,
  mode,
  onShuffle,
  onReset,
  onBackToSetup,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = `
🏆 ESCALAÇÃO CONFIRMADA 🏆

🔴 ${teamA.name.toUpperCase()}
${teamA.players.map(p => `- ${p.name} ${p.isGoalkeeper ? '🧤' : ''}`).join('\n')}

🔵 ${teamB.name.toUpperCase()}
${teamB.players.map(p => `- ${p.name} ${p.isGoalkeeper ? '🧤' : ''}`).join('\n')}

Gerado por Equipe Perfeita ⚽
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TeamCard = ({ team, colorClass, borderColor }: { team: Team; colorClass: string; borderColor: string }) => (
    <div className={`bg-slate-900 rounded-3xl overflow-hidden border-2 ${borderColor} flex flex-col h-full shadow-2xl relative`}>
      <div className={`p-6 ${colorClass} text-white`}>
        <div className="flex justify-between items-center">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">{team.name}</h3>
            <div className="bg-black/30 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest backdrop-blur-md">
                {mode === 'ADVANCED' ? `Power: ${team.totalSkill}` : `${team.players.length} Atletas`}
            </div>
        </div>
      </div>
      <div className="p-6 flex-1 space-y-3">
        {team.players.map((p) => (
            <div 
              key={p.id} 
              className={`flex items-center gap-4 p-3 rounded-xl border ${
                p.isGoalkeeper 
                ? 'bg-emerald-500/10 border-emerald-500/40' 
                : 'bg-slate-800/50 border-slate-700/50'
              }`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${
                  p.isGoalkeeper ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                    {p.isGoalkeeper ? <Shield size={18} fill="white" /> : p.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`font-extrabold uppercase tracking-tight truncate ${p.isGoalkeeper ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {p.name}
                    </p>
                    {p.isGoalkeeper && (
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                        Goleiro Titular
                    </span>
                    )}
                </div>
                {mode === 'ADVANCED' && !p.isGoalkeeper && (
                    <div className="flex gap-0.5">
                        {[...Array(p.skill)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        ))}
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-32 animate-fade-in px-4 pt-4">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-2">
        <button
            onClick={onReset}
            className="text-slate-500 hover:text-emerald-400 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors"
        >
            <ChevronLeft size={16} /> Nova Partida
        </button>
        <div className="h-px flex-1 mx-6 bg-emerald-900/20"></div>
        <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">Match Day</span>
      </div>

      {/* Main Boards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <div className="bg-emerald-500 text-white font-black italic text-4xl p-4 rounded-2xl shadow-2xl rotate-12 border-4 border-slate-950">VS</div>
        </div>

        <TeamCard 
            team={teamA} 
            colorClass="bg-gradient-to-br from-red-600 to-red-800"
            borderColor="border-red-900/30"
        />

        {/* Ad Space Mobile (In-feed) */}
        <div className="md:hidden w-full py-2">
             <div className="w-full h-64 bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest absolute top-2 left-4">Publicidade</span>
                <div className="text-slate-800 font-bold text-xs uppercase tracking-tighter">ADSENSE MID-CONTENT BANNER</div>
             </div>
        </div>

        <TeamCard 
            team={teamB} 
            colorClass="bg-gradient-to-br from-blue-600 to-blue-800"
            borderColor="border-blue-900/30"
        />
      </div>

      {/* Score Comparison */}
      {mode === 'ADVANCED' && (
         <div className="bg-slate-900/50 border border-emerald-900/30 rounded-3xl p-6 text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Equilíbrio Técnico</p>
             <div className="flex justify-center items-center gap-8">
                 <div className="text-center">
                    <p className="text-red-500 font-black text-2xl">{teamA.totalSkill}</p>
                    <p className="text-[9px] font-bold text-slate-600 uppercase">Power A</p>
                 </div>
                 <div className="h-8 w-px bg-slate-800"></div>
                 <div className="text-center">
                    <p className="text-white font-black text-xl italic">{Math.abs(teamA.totalSkill - teamB.totalSkill)}</p>
                    <p className="text-[9px] font-bold text-slate-600 uppercase">Diferença</p>
                 </div>
                 <div className="h-8 w-px bg-slate-800"></div>
                 <div className="text-center">
                    <p className="text-blue-500 font-black text-2xl">{teamB.totalSkill}</p>
                    <p className="text-[9px] font-bold text-slate-600 uppercase">Power B</p>
                 </div>
             </div>
         </div>
      )}

      {/* Desktop Footer Ad Space */}
      <div className="hidden md:flex w-full h-24 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl items-center justify-center relative overflow-hidden">
          <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.5em] absolute top-2 right-6">Publicidade</span>
          <div className="text-slate-800 font-bold text-[11px] uppercase tracking-widest">GOOGLE ADSENSE LEADERBOARD (728x90)</div>
      </div>

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/95 backdrop-blur-xl border-t border-emerald-900/30 z-50">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4">
             {mode === 'ADVANCED' && onBackToSetup && (
               <button
                  onClick={onBackToSetup}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all active:scale-95"
               >
                  <UserCog size={18} /> Editar
               </button>
             )}
             <button
                onClick={onShuffle}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all active:scale-95"
             >
                <Shuffle size={18} /> Resortear
             </button>
             <button
                onClick={copyToClipboard}
                className={`flex-[2] md:flex-none md:w-64 flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 ${
                    copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                }`}
             >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                <span>{copied ? 'Escalação Copiada!' : 'Enviar Convocações'}</span>
             </button>
        </div>
      </div>
    </div>
  );
};