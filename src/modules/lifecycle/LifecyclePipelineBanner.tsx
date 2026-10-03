import React, { useState } from 'react';
import { ARCHITECTURAL_LIFECYCLE, ArchitecturalStage } from '../../types/modularization';
import { Layers, ArrowRight, CheckCircle2, ShieldCheck, Box } from 'lucide-react';

interface LifecyclePipelineBannerProps {
  playBlip: () => void;
}

export const LifecyclePipelineBanner: React.FC<LifecyclePipelineBannerProps> = ({ playBlip }) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('modularization');
  const activeStage = ARCHITECTURAL_LIFECYCLE.find((s) => s.id === selectedStageId) || ARCHITECTURAL_LIFECYCLE[3];

  const handleStageSelect = (stage: ArchitecturalStage) => {
    playBlip();
    setSelectedStageId(stage.id);
  };

  return (
    <div className="border border-slate-800 bg-[#0A0E18] p-4 sm:p-5 mb-6 relative corner-crosshairs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            METODOLOGIA ANALÍTICA: BRIEFING ──&gt; ESBOÇO ──&gt; REFINAMENTO ──&gt; MODULARIZAÇÃO
          </span>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          SEPARAÇÃO ESTRUTURAL DE RESPONSABILIDADES
        </span>
      </div>

      {/* 4 Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
        {ARCHITECTURAL_LIFECYCLE.map((stage, idx) => {
          const isSelected = selectedStageId === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => handleStageSelect(stage)}
              className={`p-3 text-left border transition-all cursor-pointer relative group ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-500">
                <span className={isSelected ? 'text-cyan-300 font-bold' : ''}>ESTÁGIO 0{stage.stepNum}</span>
                {idx < ARCHITECTURAL_LIFECYCLE.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:inline" />
                )}
              </div>
              <div className="text-xs font-bold font-display uppercase tracking-wide text-slate-100 mb-1">
                {stage.name}
              </div>
              <div className="text-[10px] font-mono text-cyan-400/80 line-clamp-1">
                {stage.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Telemetry Detail */}
      <div className="p-3.5 bg-slate-950/80 border border-slate-800/90 text-xs font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/60 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-bold uppercase">
              FOCO METODOLÓGICO: {activeStage.name}
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            APLICAÇÃO NA CONSTRUÇÃO DA NARRATIVA
          </span>
        </div>

        <p className="text-slate-300 mb-2 leading-relaxed">
          {activeStage.responsibility}
        </p>

        <div className="text-[11px] text-cyan-400/90 mb-2.5">
          <strong className="text-slate-400 uppercase mr-1">Impacto na Redação:</strong>
          <span>{activeStage.llmApplication}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
          <span className="text-[10px] text-slate-500 uppercase self-center mr-1">Resultados Esperados:</span>
          {activeStage.deliverables.map((deliv, dIdx) => (
            <span
              key={dIdx}
              className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>{deliv}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
