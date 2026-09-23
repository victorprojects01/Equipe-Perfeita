import React, { useState, useCallback } from 'react';
import { AppMode, AppStep, Player, Team } from './types';
import { InputStep } from './components/InputStep';
import { AdvancedSetupStep } from './components/AdvancedSetupStep';
import { ResultsStep } from './components/ResultsStep';
import { splitRandomly, splitBalanced } from './utils/logic';
import { AdSenseAd } from './components/AdSenseAd';
import { AmazonAffiliateAds } from './components/AmazonAffiliateAds';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ShieldCheck, FileText, Info } from 'lucide-react';

// Helper for generating IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('INPUT');
  const [mode, setMode] = useState<AppMode>('BASIC');
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);

  // Legal Modal states (Essential for Google AdSense compliance)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleInputComplete = (names: string[], selectedMode: AppMode) => {
    const initialPlayers: Player[] = names.map(name => {
      // Verifica se a palavra "goleiro" está no nome (case-insensitive)
      const isAutoGoalkeeper = name.toLowerCase().includes('goleiro');
      
      return {
        id: generateId(),
        name,
        isGoalkeeper: isAutoGoalkeeper,
        skill: 3, // Default skill
        position: isAutoGoalkeeper ? 'GOL' : 'MC',
      };
    });

    setPlayers(initialPlayers);
    setMode(selectedMode);

    if (selectedMode === 'BASIC') {
      const [a, b] = splitRandomly(initialPlayers);
      setTeamA(a);
      setTeamB(b);
      setStep('RESULTS');
    } else {
      setStep('SETUP');
    }
  };

  const handleAdvancedSetupComplete = () => {
    // Generate teams based on current player config
    const [a, b] = splitBalanced(players);
    setTeamA(a);
    setTeamB(b);
    setStep('RESULTS');
  };

  const handleReshuffle = useCallback(() => {
    if (mode === 'BASIC') {
      const [a, b] = splitRandomly(players);
      setTeamA(a);
      setTeamB(b);
    } else {
      const [a, b] = splitBalanced(players);
      setTeamA(a);
      setTeamB(b);
    }
  }, [mode, players]);

  const handleReset = () => {
    if (window.confirm("Recomeçar? Sua lista atual será mantida, mas as configurações podem ser resetadas.")) {
      setStep('INPUT');
      setTeamA(null);
      setTeamB(null);
      setPlayers([]);
    }
  };

  const handleSoftReset = () => {
    setStep('INPUT');
  };

  const handleBackToSetup = () => {
    setStep('SETUP');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 flex flex-col justify-between">
      <main className="container mx-auto px-4 py-8 md:py-12 flex-1">
        {step === 'INPUT' && (
          <InputStep onNext={handleInputComplete} />
        )}

        {step === 'SETUP' && (
          <AdvancedSetupStep 
            players={players} 
            onUpdatePlayers={setPlayers} 
            onFinish={handleAdvancedSetupComplete}
            onBack={() => setStep('INPUT')}
          />
        )}

        {step === 'RESULTS' && teamA && teamB && (
          <ResultsStep 
            teamA={teamA} 
            teamB={teamB} 
            mode={mode} 
            onShuffle={handleReshuffle}
            onReset={handleSoftReset}
            onBackToSetup={handleBackToSetup}
          />
        )}

        <AmazonAffiliateAds />

        {/* Bloco de Anúncios AdSense com espaçamento seguro contra cliques acidentais */}
        <div className="w-full max-w-4xl mx-auto mt-12 mb-6 px-2 clear-both">
          <AdSenseAd />
        </div>
      </main>
      
      {/* Rodapé institucional com links de conformidade Google AdSense & LGPD */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm py-6 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Equipe Perfeita</span>
            <span>•</span>
            <span>Sorteador e equilibrador inteligente de times</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => openLegal('privacy')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
            >
              <ShieldCheck size={13} />
              <span>Política de Privacidade</span>
            </button>
            <span>•</span>
            <button
              onClick={() => openLegal('terms')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
            >
              <FileText size={13} />
              <span>Termos de Uso</span>
            </button>
            <span>•</span>
            <button
              onClick={() => openLegal('about')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
            >
              <Info size={13} />
              <span>Sobre o App</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-600">
            Anúncios em conformidade com as diretrizes do Google AdSense
          </div>
        </div>
      </footer>

      {/* Modal de Transparência e Políticas Obrigatórias */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Banner de consentimento de cookies para LGPD e Google AdSense */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => openLegal('privacy')}
      />
    </div>
  );
};

export default App;
