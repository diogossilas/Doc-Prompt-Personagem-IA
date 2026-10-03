import React, { useEffect } from 'react';
import { APP_PAGES } from '../../types/navigation';
import { ARCHITECTURAL_LIFECYCLE } from '../../types/modularization';
import { X, Volume2, VolumeX, Sliders, Printer, Shield, Compass, ListFilter, GitFork, ShieldCheck, ChevronRight } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onPageChange: (id: string) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  isCompactMode: boolean;
  setIsCompactMode: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenReportModal?: () => void;
  playBlip: () => void;
}

const PAGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  diagram: Compass,
  subsections: ListFilter,
  'flow-matrix': GitFork,
  generator: Printer,
  operational: ShieldCheck,
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  activeTab,
  onPageChange,
  audioEnabled,
  toggleAudio,
  isCompactMode,
  setIsCompactMode,
  onOpenReportModal,
  playBlip,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (pageId: string) => {
    playBlip();
    onPageChange(pageId);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <aside className="relative z-50 w-[310px] sm:w-[380px] max-w-[85vw] h-full bg-[#080C14] border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
        <div>
          {/* Header of Drawer */}
          <div className="flex items-center justify-between border-b border-slate-800/90 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold font-display uppercase tracking-wider text-white">
                  Doc. Eng-Prompt LLMs e Agentes IA
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  NAVEGAÇÃO EDITORIAL
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="p-1.5 border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Pages */}
          <div className="mb-6">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2.5 px-1">
              PÁGINAS DO SISTEMA:
            </div>
            <nav className="space-y-1.5">
              {APP_PAGES.map((page) => {
                const Icon = PAGE_ICONS[page.id] || Compass;
                const isActive = activeTab === page.id;

                return (
                  <button
                    key={page.id}
                    onClick={() => handleItemClick(page.id)}
                    className={`w-full text-left p-2.5 border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'border-cyan-500 bg-cyan-950/40 text-white font-semibold'
                        : 'border-slate-800/80 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-mono font-bold">
                          {page.num < 10 ? `0${page.num}` : page.num}. {page.shortTitle}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                          {page.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Methodology: Brief -> Sketch -> Studio -> Modularization */}
          <div className="mb-6 p-3 bg-slate-950/80 border border-slate-800/80">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              METODOLOGIA ANALÍTICA (──&gt;):
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              {ARCHITECTURAL_LIFECYCLE.map((stage) => (
                <div
                  key={stage.id}
                  className="p-1.5 bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-1"
                >
                  <span className="text-cyan-400 font-bold">0{stage.stepNum}.</span>
                  <span className="truncate">{stage.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="border-t border-slate-800/90 pt-4 space-y-2.5">
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleAudio();
              }}
              className={`flex-1 px-3 py-2 text-xs font-mono border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                audioEnabled
                  ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{audioEnabled ? 'ÁUDIO: ON' : 'ÁUDIO: OFF'}</span>
            </button>

            {/* View Density Toggle */}
            <button
              onClick={() => {
                playBlip();
                setIsCompactMode((prev) => !prev);
              }}
              className="flex-1 px-3 py-2 text-xs font-mono border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isCompactMode ? 'COMPACTO' : 'EXPANDIDO'}</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playBlip();
              onClose();
              if (onOpenReportModal) {
                onOpenReportModal();
              } else {
                handleItemClick('generator');
              }
            }}
            className="w-full py-2.5 px-4 text-xs font-mono font-bold tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          >
            <Printer className="w-4 h-4" />
            <span>GERAR RELATÓRIO OPERACIONAL</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
