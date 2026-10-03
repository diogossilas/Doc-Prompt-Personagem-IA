import React from 'react';
import { OPERATIONAL_STEPS } from '../../data/reportData';
import { OperationalStepCard } from './OperationalStepCard';
import { ComplianceChecklist } from './ComplianceChecklist';

interface OperationalFlowSectionProps {
  playBlip: () => void;
  playConfirmed: () => void;
}

export const OperationalFlowSection: React.FC<OperationalFlowSectionProps> = ({
  playBlip,
  playConfirmed,
}) => {
  return (
    <section id="operational" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>MÓDULO V</span>
            <span aria-hidden="true">·</span>
            <span>METODOLOGIA DE PRODUÇÃO</span>
            <span aria-hidden="true">·</span>
            <span>VERIFICAÇÃO DE COERÊNCIA (──&gt;)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mb-2">
            V. FLUXO METODOLÓGICO E CRITÉRIOS DE COERÊNCIA
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            Para assegurar que as respostas do agente mantenham coerência e fidelidade conceitual ao longo de múltiplos diálogos, o processo adota três etapas de checagem editorial antes da publicação definitiva do texto: estruturação de premissas, conferência de enredo e validação estilística final.
          </p>
        </div>

        {/* Modular Operational Steps */}
        <div className="space-y-4 mb-8">
          {OPERATIONAL_STEPS.map((op, idx) => (
            <OperationalStepCard
              key={op.step}
              op={op}
              index={idx}
              totalSteps={OPERATIONAL_STEPS.length}
            />
          ))}
        </div>

        {/* Modular Compliance Checklist */}
        <ComplianceChecklist
          playBlip={playBlip}
          playConfirmed={playConfirmed}
        />
      </div>
    </section>
  );
};
