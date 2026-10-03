import React, { useState } from 'react';
import { Volume2, VolumeX, Printer, Sliders, Shield, Menu } from 'lucide-react';
import { APP_PAGES } from './PagePagination';
import { HamburgerMenu } from '../modules/navigation/HamburgerMenu';

interface TacticalHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  playBlip: () => void;
  isCompactMode: boolean;
  setIsCompactMode: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenReportModal?: () => void;
}

export const TacticalHeader: React.FC<TacticalHeaderProps> = ({
  activeTab,
  setActiveTab,
  audioEnabled,
  toggleAudio,
  playBlip,
  isCompactMode,
  setIsCompactMode,
  onOpenReportModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleNavClick = (id: string) => {
    playBlip();
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors">
        <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-3">
          {/* Zone 1: Brand Zone */}
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
            <button
              onClick={() => handleNavClick('diagram')}
              className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold tracking-wider text-slate-100 font-display hover:text-cyan-400 transition-colors uppercase truncate max-w-[160px] xs:max-w-[220px] sm:max-w-none cursor-pointer text-left"
            >
              Doc. Eng-Prompt LLMs e Agentes IA
            </button>
          </div>

          {/* Zone 2: 4-6 text navigation links (desktop & tablet) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-wider font-mono">
            {APP_PAGES.map((page) => (
              <button
                key={page.id}
                onClick={() => handleNavClick(page.id)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
                  activeTab === page.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{page.shortTitle}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions & Hamburger Menu (Icons Only on Mobile View) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio toggle button: ONLY ICON on mobile */}
            <button
              onClick={toggleAudio}
              title={audioEnabled ? 'Desativar áudio HUD' : 'Ativar áudio HUD'}
              aria-label={audioEnabled ? 'Desativar áudio HUD' : 'Ativar áudio HUD'}
              className={`p-2 min-h-[44px] min-w-[44px] text-xs font-mono tracking-wider border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                audioEnabled
                  ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden xl:inline">{audioEnabled ? 'HUD AUDIO: ON' : 'HUD AUDIO: OFF'}</span>
            </button>

            {/* Density toggle button: ONLY ICON on mobile/tablet */}
            <button
              onClick={() => {
                playBlip();
                setIsCompactMode((prev) => !prev);
              }}
              title="Alternar densidade de visualização dos nós"
              aria-label="Alternar densidade de visualização"
              className="p-2 min-h-[44px] min-w-[44px] text-xs font-mono tracking-wider border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:text-white transition-colors hidden sm:flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline">{isCompactMode ? 'COMPACTO' : 'EXPANDIDO'}</span>
            </button>

            {/* Quick Report CTA: ONLY ICON on mobile view */}
            <button
              onClick={() => {
                playBlip();
                if (onOpenReportModal) {
                  onOpenReportModal();
                } else {
                  handleNavClick('generator');
                }
              }}
              title="Gerar Relatório Operacional"
              aria-label="Gerar Relatório Operacional"
              className="px-2.5 sm:px-3 py-2 min-h-[44px] min-w-[44px] text-xs font-mono tracking-wider font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">RELATÓRIO</span>
            </button>

            {/* Tactical Hamburger Menu Button */}
            <button
              onClick={() => {
                playBlip();
                setIsMenuOpen(true);
              }}
              aria-label="Abrir menu de navegação tático"
              title="Menu hamburguer"
              className="p-2 min-h-[44px] min-w-[44px] text-slate-300 hover:text-cyan-300 border border-slate-800 bg-slate-900/60 hover:border-cyan-500 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Menu className="w-5 h-5 text-cyan-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Drawer Overlay */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        onPageChange={handleNavClick}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
        isCompactMode={isCompactMode}
        setIsCompactMode={setIsCompactMode}
        onOpenReportModal={onOpenReportModal}
        playBlip={playBlip}
      />
    </>
  );
};
