import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Info, ExternalLink } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'about';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-emerald-900/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Informações Legais & Transparência
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={14} /> Política de Privacidade
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={14} /> Termos de Uso
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'about'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info size={14} /> Sobre o App
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Política de Privacidade & Cookies (AdSense & LGPD)</h3>
              <p className="text-xs text-slate-400">Última atualização: Setembro de 2026</p>

              <div className="bg-emerald-950/20 border border-emerald-800/30 p-4 rounded-2xl">
                <p className="font-semibold text-emerald-300 mb-1">Compromisso de Transparência</p>
                <p className="text-xs text-emerald-200/80">
                  O <strong>Equipe Perfeita</strong> respeita a sua privacidade. Nomes de atletas, escalações e
                  dados inseridos no app são processados no seu próprio navegador e não são armazenados em servidores externos nem comercializados.
                </p>
              </div>

              <h4 className="font-bold text-white text-base mt-4">1. Uso de Cookies e Google AdSense</h4>
              <p>
                Este site exibe anúncios veiculados pelo <strong>Google AdSense</strong>. O Google e terceiros fornecedores utilizam cookies
                para veicular anúncios com base em visitas anteriores dos usuários a este ou a outros sites na internet.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>
                  O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios com base
                  na navegação em sites da internet.
                </li>
                <li>
                  Você pode desativar a publicidade personalizada acessando as{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Configurações de Anúncios do Google <ExternalLink size={12} />
                  </a>.
                </li>
                <li>
                  Como alternativa, é possível desativar o uso de cookies de terceiros para publicidade personalizada acessando o portal{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    AboutAds.info <ExternalLink size={12} />
                  </a>.
                </li>
              </ul>

              <h4 className="font-bold text-white text-base mt-4">2. Como o Google utiliza dados dos sites parceiros</h4>
              <p>
                Para saber detalhadamente como o Google gerencia os dados coletados através do programa AdSense, consulte a página oficial:{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Como o Google usa informações de sites ou apps parceiros <ExternalLink size={12} />
                </a>.
              </p>

              <h4 className="font-bold text-white text-base mt-4">3. Lei Geral de Proteção de Dados (LGPD - Brasil)</h4>
              <p>
                Em consonância com a Lei nº 13.709/2018 (LGPD), garantimos aos usuários total controle sobre seus consentimentos
                e informações no âmbito deste aplicativo gratuito.
              </p>

              <h4 className="font-bold text-white text-base mt-4">4. Armazenamento Local (localStorage)</h4>
              <p>
                Podemos utilizar o armazenamento local do seu dispositivo exclusivamente para memorizar preferências de uso, como:
                a lista de convocados recentes e a confirmação do aviso de cookies. Nenhuma dessas informações identifica você civilmente.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Termos de Uso do Serviço</h3>
              <p className="text-xs text-slate-400">Condições gerais para utilização do Equipe Perfeita</p>

              <div className="space-y-3">
                <h4 className="font-bold text-white">1. Objeto do Aplicativo</h4>
                <p>
                  O <strong>Equipe Perfeita</strong> é uma plataforma web gratuita desenvolvida para facilitar a divisão equilibrada e justa
                  de equipes para partidas esportivas, futebol de fim de semana, jogos coletivos e atividades recreativas.
                </p>

                <h4 className="font-bold text-white">2. Gratuidade e Sustentabilidade</h4>
                <p>
                  O acesso às ferramentas de sorteio rápido e escalação técnica é totalmente gratuito. A manutenção dos servidores
                  e desenvolvimento contínuo são financiados por anúncios publicitários exibidos em conformidade com as diretrizes do Google AdSense.
                </p>

                <h4 className="font-bold text-white">3. Isenção de Responsabilidade</h4>
                <p>
                  O aplicativo é fornecido &quot;no estado em que se encontra&quot;. Os algoritmos de equilíbrio visam fornecer sugestões estatísticas
                  de divisão baseadas nos critérios inseridos pelo próprio usuário, não garantindo resultados esportivos ou desfechos de partidas.
                </p>

                <h4 className="font-bold text-white">4. Conduta do Usuário</h4>
                <p>
                  É vedado utilizar o serviço para inserir termos ofensivos, discriminatórios ou que violem a legislação vigente.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Sobre o Equipe Perfeita</h3>
              <p>
                O <strong>Equipe Perfeita</strong> nasceu para resolver a eterna discussão do futebol de fim de semana: como montar dois times
                equilibrados, com goleiros bem distribuídos e partidas mais disputadas e prazerosas para todos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">Sorteio Rápido</h4>
                  <p className="text-xs text-slate-400">
                    Basta colar a lista e o sistema cuida do sorteio aleatório, mantendo a divisão de goleiros balanceada de forma automática.
                  </p>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">Escalação Elite</h4>
                  <p className="text-xs text-slate-400">
                    Permite calibrar o nível de habilidade (1 a 5 estrelas) e posições de cada atleta para gerar equipes com equilíbrio de pontuação.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-6">
                <p className="text-xs text-slate-400">
                  Tem sugestões de melhorias ou parcerias? Entre em contato pelo e-mail oficial do desenvolvedor informado no rodapé.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
