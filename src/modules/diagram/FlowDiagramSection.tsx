import React, { useState } from 'react';
import { PhasePipelineCards } from './PhasePipelineCards';
import { AsciiSchemaViewer } from './AsciiSchemaViewer';
import { PhaseInfo } from '../../types/report';
import { ShieldCheck } from 'lucide-react';

interface FlowDiagramSectionProps {
  playBlip: () => void;
  onSelectTag: (tag: string) => void;
}

export const FlowDiagramSection: React.FC<FlowDiagramSectionProps> = ({
  playBlip,
  onSelectTag,
}) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);

  const handlePhaseClick = (phase: PhaseInfo) => {
    playBlip();
    setSelectedPhaseId(phase.id);
  };

  return (
    <section id="diagram" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80 relative overflow-hidden tactical-grid">
      {/* Light-line scanning laser */}
      <div className="anim-laser-line" />

      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>MÓDULO I</span>
            <span aria-hidden="true">·</span>
            <span>ARQUITETURA ANALÍTICA DE CONTEÚDO</span>
            <span aria-hidden="true">·</span>
            <span>PROGRESSÃO ESTRUTURADA (──&gt;)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-2">
            I. DIAGRAMA GERAL DE ENCADEAMENTO DA INFORMAÇÃO
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            O método organiza a construção do agente em cinco etapas consecutivas. Em vez de comandos avulsos, cada fase estabelece premissas essenciais que alimentam a seguinte: o contexto do mundo orienta a identidade, a identidade fundamenta a psicologia e as motivações, estas definem as capacidades práticas e, por fim, o formato de apresentação garante a clareza e o impacto da resposta final.
          </p>
        </div>

        {/* Modular Phase Pipeline Component */}
        <PhasePipelineCards
          selectedPhaseId={selectedPhaseId}
          onPhaseSelect={handlePhaseClick}
          onSelectTag={onSelectTag}
          playBlip={playBlip}
        />

        {/* Structural Text / ASCII Flow Representation Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-slate-800 bg-[#0B101B]/60 p-4 sm:p-5">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Princípio Editorial da Progressão Analítica (──&gt;)</span>
            </h4>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                A consistência textual é garantida pelo respeito às fronteiras do cenário: a persona não propõe ações que contrariem as limitações do seu ambiente (<code className="text-cyan-400 font-mono">&lt;theater&gt;</code>) e preserva um vocabulário condizente com sua formação (<code className="text-cyan-400 font-mono">&lt;voice&gt;</code>).
              </p>
              <p>
                A introdução consciente de traços humanos e vulnerabilidades (<code className="text-cyan-400 font-mono">&lt;flaw&gt;</code>, <code className="text-cyan-400 font-mono">&lt;fears&gt;</code>, <code className="text-cyan-400 font-mono">&lt;internal_conflict&gt;</code>) humaniza a narrativa e quebra a tendência dos modelos de emitir respostas idealizadas ou previsíveis.
              </p>
              <p>
                Na entrega final, as diretrizes de formato (<code className="text-cyan-400 font-mono">&lt;format_hint&gt;</code>) e o exemplo de redação (<code className="text-cyan-400 font-mono">&lt;scene_sample&gt;</code>) asseguram uma leitura fluida, objetiva e visualmente bem diagramada.
              </p>
            </div>
          </div>

          {/* Modular Ascii Diagram */}
          <AsciiSchemaViewer />
        </div>
      </div>
    </section>
  );
};
