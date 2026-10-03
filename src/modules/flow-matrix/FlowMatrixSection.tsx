import React from 'react';
import { OperatorLegend } from './OperatorLegend';
import { ScenarioSimulator } from './ScenarioSimulator';

interface FlowMatrixSectionProps {
  playBlip: () => void;
  playChirp: () => void;
  onSelectTag: (tag: string) => void;
}

export const FlowMatrixSection: React.FC<FlowMatrixSectionProps> = ({
  playBlip,
  playChirp,
  onSelectTag,
}) => {
  return (
    <section id="flow-matrix" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#070A11] tactical-grid">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>MÓDULO III</span>
            <span aria-hidden="true">·</span>
            <span>RELAÇÕES DE CAUSA E EFEITO</span>
            <span aria-hidden="true">·</span>
            <span>ENCADEAMENTO ANALÍTICO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-2">
            III. MATRIZ DE ENCADEAMENTO E RELAÇÕES (──&gt;)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            Este modelo analítico funciona por meio de módulos interdependentes. Em vez de blocos isolados, a estrutura articula causa e efeito através do encadeamento direto (<code className="text-cyan-400 font-mono">──&gt;</code>), da aplicação de salvaguardas e filtros editoriais (<code className="text-amber-300 font-mono">──&gt; [Filtro]</code>) e da associação mútua contínua (<code className="text-blue-300 font-mono">──</code>). Essa mecânica assegura clareza investigativa, consistência nos argumentos e rigor em todas as fases da análise.
          </p>
        </div>

        {/* Modular Legend */}
        <OperatorLegend />

        {/* Modular Scenario Simulator */}
        <ScenarioSimulator
          playBlip={playBlip}
          playChirp={playChirp}
          onSelectTag={onSelectTag}
        />
      </div>
    </section>
  );
};
