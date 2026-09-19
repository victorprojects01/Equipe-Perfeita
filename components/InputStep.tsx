import React, { useState, useEffect } from 'react';
import { Users, Dices, ShieldCheck, Trophy, Sparkles, CheckCircle2, ChevronDown, Award } from 'lucide-react';
import { AppMode } from '../types';

interface InputStepProps {
  onNext: (rawNames: string[], mode: AppMode) => void;
}

export const InputStep: React.FC<InputStepProps> = ({ onNext }) => {
  const [text, setText] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      q: 'Como funciona o sorteador de times Equipe Perfeita?',
      a: 'Basta colar a lista de convocados (um nome por linha) e escolher o método: Sorteio Rápido para divisão instantânea ou Escalação Elite para calibrar posições e estrelas de habilidade (1 a 5).'
    },
    {
      q: 'Como garantir que os goleiros fiquem em times diferentes?',
      a: 'É automático! Basta escrever a palavra "goleiro" junto ao nome do atleta (exemplo: "Lucas Goleiro" ou "Goleiro Marcos") que o algoritmo distribui os arqueiros igualmente entre as equipes.'
    },
    {
      q: 'O algoritmo equilibra times desiguais em número de jogadores?',
      a: 'Sim. Se a quantidade de atletas for ímpar, os jogadores são distribuídos com a menor diferença possível e o sistema avisa quem pode ser reserva ou rotativo.'
    },
    {
      q: 'Posso copiar os times sorteados para o WhatsApp?',
      a: 'Com certeza! Na tela de resultados, há um botão dedicado para copiar a escalação completa com emojis e formatação pronta para colar no grupo da partida.'
    }
  ];

  return (
    <article className="w-full max-w-2xl mx-auto space-y-10 animate-fade-in py-8 px-4">
      {/* Header com H1 semântico e subtítulo */}
      <header className="space-y-3 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 rounded-full mb-1">
          <Trophy className="text-emerald-400" size={32} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white uppercase italic">
          Equipe <span className="text-emerald-500">Perfeita</span>
        </h1>
        <p className="text-emerald-200/80 font-medium tracking-wide text-sm sm:text-base">
          Divisor e Sorteador Inteligente de Times de Futebol & Esportes
        </p>
      </header>

      {/* Caixa de Entrada de Nomes */}
      <section aria-labelledby="input-heading" className="relative group">
        <h2 id="input-heading" className="sr-only">Insira a lista de atletas para o sorteio</h2>
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl">
          <label htmlFor="player-names-input" className="sr-only">
            Lista de jogadores (um nome por linha)
          </label>
          <textarea
            id="player-names-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole a lista de convocados (um por linha)...&#10;Ex: Romário&#10;Ronaldo&#10;Goleiro Marcos&#10;Zico"
            className="w-full h-72 bg-transparent text-white p-6 focus:outline-none resize-none leading-relaxed placeholder:text-slate-600 font-medium text-base sm:text-lg"
          />
          <div className="p-4 bg-slate-950/80 backdrop-blur-sm border-t border-emerald-900/30 flex justify-between items-center">
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
      </section>

      {error && (
        <div role="alert" className="p-4 bg-red-500/20 border border-red-500/50 text-red-100 rounded-xl text-sm font-bold text-center animate-bounce">
          ⚠️ {error}
        </div>
      )}

      {/* Botões de Ação com Hierarquia Semântica */}
      <section aria-label="Opções de Sorteio" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleNext('BASIC')}
          className="group relative overflow-hidden bg-white text-slate-950 p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold uppercase italic leading-none block">Sorteio Rápido</span>
              <span className="text-xs font-bold text-slate-500 mt-2 tracking-tight block">ALEATÓRIO E DIRETO</span>
            </div>
            <Dices size={32} className="text-emerald-600 shrink-0 ml-2" />
          </div>
        </button>

        <button
          onClick={() => handleNext('ADVANCED')}
          className="group relative overflow-hidden bg-emerald-500 text-white p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold uppercase italic leading-none block">Escalação Elite</span>
              <span className="text-xs font-bold text-emerald-950 mt-2 tracking-tight block">EQUILÍBRIO TÉCNICO</span>
            </div>
            <ShieldCheck size={32} className="shrink-0 ml-2" />
          </div>
        </button>
      </section>

      {/* Seção Informativa de SEO: Vantagens e Explicação */}
      <section aria-labelledby="features-heading" className="pt-8 border-t border-slate-900 space-y-6">
        <div className="text-center space-y-2">
          <h2 id="features-heading" className="text-2xl font-bold text-white tracking-tight">
            Como funciona o gerador de times equilibrados?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Acabe com a discussão na pelada. O algoritmo divide as equipes de forma justa, levando em consideração o nível de habilidade e posições em campo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <Sparkles size={18} />
            </div>
            <h3 className="font-bold text-white text-sm">Separação de Goleiros</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detecta arqueiros no texto e garante 1 goleiro para cada lado sem precisar configurar nada manualmente.
            </p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <Award size={18} />
            </div>
            <h3 className="font-bold text-white text-sm">Pontuação Técnica</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Avalie os atletas de 1 a 5 estrelas na Escalação Elite para gerar times com forças estatisticamente idênticas.
            </p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="font-bold text-white text-sm">Pronto pro Zap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Copie a lista pronta e formatada com nomes e estatísticas com apenas um clique para compartilhar com a galera.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ para busca orgânica (Google Rich Snippets) */}
      <section aria-labelledby="faq-heading" className="space-y-4 pt-4">
        <h2 id="faq-heading" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Perguntas Frequentes sobre Divisão de Times
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-800/90 bg-slate-900/40 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
