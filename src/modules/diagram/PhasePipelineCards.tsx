import React from 'react';
import { PHASES_DATA, PhaseInfo } from '../../data/reportData';
import { ArrowRight, Compass, Terminal, Cpu } from 'lucide-react';

interface PhasePipelineCardsProps {
  selectedPhaseId: number;
  onPhaseSelect: (phase: PhaseInfo) => void;
  onSelectTag: (tag: string) => void;
  playBlip: () => void;
}

export const PhasePipelineCards: React.FC<PhasePipelineCardsProps> = ({
  selectedPhaseId,
  onPhaseSelect,
  onSelectTag,
  playBlip,
}) => {
  const selectedPhase = PHASES_DATA.find((p) => p.id === selectedPhaseId) || PHASES_DATA[0];

  return (
    <div className="border border-slate-800 bg-[#0B101B]/80 backdrop-blur-sm p-4 sm:p-6 mb-6 corner-crosshairs relative">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-200">
          ESTRUTURA ANALÍTICA · PROGRESSÃO METODOLÓGICA CONTÍNUA (──&gt;)
        </span>
        <div className="text-xs font-mono text-slate-400">
          ETAPAS: <span className="text-cyan-400">05 FASES METODOLÓGICAS</span>
        </div>
      </div>

      {/* Interactive Phase Flow Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {PHASES_DATA.map((phase, idx) => {
          const isSelected = selectedPhaseId === phase.id;
          return (
            <div key={phase.id} className="relative flex flex-col">
              <button
                onClick={() => onPhaseSelect(phase)}
                className={`w-full text-left p-3.5 border transition-all cursor-pointer relative overflow-hidden group min-h-[44px] ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {/* Top indicator line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] ${
                    isSelected ? 'bg-cyan-400 anim-pulse-glow' : 'bg-transparent group-hover:bg-slate-700'
                  }`}
                />

                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className={isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-500'}>
                    {phase.code}
                  </span>
                  <span className="text-slate-500 tabular-nums">0{idx + 1}</span>
                </div>

                <div className="text-xs font-bold font-display uppercase tracking-wide mb-2 text-slate-100 line-clamp-2">
                  {phase.name}
                </div>

                <div className="text-[10px] font-mono text-cyan-400/80 truncate mb-2">
                  ──&gt; {phase.anchorType}
                </div>

                <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-800/60">
                  {phase.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-1 py-0.5 bg-slate-950/60 border border-slate-800/80 text-slate-400 group-hover:text-slate-300"
                    >
                      &lt;{t}&gt;
                    </span>
                  ))}
                </div>
              </button>

              {/* Flow connector arrow for desktop */}
              {idx < PHASES_DATA.length - 1 && (
                <div className="hidden md:flex items-center justify-center absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/70 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Selected Phase Telemetry Card */}
      <div className="border border-cyan-900/50 bg-slate-950/70 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{selectedPhase.code}</span>
              <span aria-hidden="true">·</span>
              <span>PROGRESSÃO ANALÍTICA</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPhase.anchorType}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              {selectedPhase.name}
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Foco: {selectedPhase.subtitle}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {selectedPhase.description}
        </p>

        {/* Micro-tags bar */}
        <div className="mb-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
            Subseções Integrantes desta Fase (Selecione para explorar o conteúdo):
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedPhase.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playBlip();
                  onSelectTag(tag);
                }}
                className="px-2.5 py-1 text-xs font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[32px]"
              >
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>&lt;{tag}&gt;</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vector relation formula */}
        <div className="p-3 bg-[#080C14] border border-slate-800 font-mono text-xs text-cyan-300 flex items-center gap-2 overflow-x-auto">
          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-500 shrink-0">ENCADEAMENTO ANALÍTICO:</span>
          <span className="font-semibold whitespace-nowrap">{selectedPhase.flowRelation}</span>
        </div>
      </div>
    </div>
  );
};
