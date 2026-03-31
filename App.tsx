import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppMode, AppStep, Player, Team } from './types';
import { InputStep } from './components/InputStep';
import { AdvancedSetupStep } from './components/AdvancedSetupStep';
import { ResultsStep } from './components/ResultsStep';
import { splitRandomly, splitBalanced } from './utils/logic';

// Helper for generating IDs since we don't have UUID library installed
const generateId = () => Math.random().toString(36).substr(2, 9);

import { LocalAd } from './components/LocalAd';
import { SupabaseAds } from './components/SupabaseAds';
import { LOCAL_ADS } from './src/constants/ads';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('INPUT');
  const [mode, setMode] = useState<AppMode>('BASIC');
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);

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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
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

        {/* Espaço para Publicidade Local e Supabase */}
        <div className="mt-12 max-w-2xl mx-auto space-y-4">
          {LOCAL_ADS.length > 0 ? (
            <LocalAd ad={LOCAL_ADS[0]} />
          ) : (
            <SupabaseAds />
          )}
        </div>

      </div>
      
      {/* Simple Footer */}
      <footer className="fixed bottom-4 right-4 hidden md:block opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-xs text-slate-600">Equipe Perfeita v1.0</span>
      </footer>
    </div>
  );
};

export default App;