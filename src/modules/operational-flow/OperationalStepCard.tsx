import React from 'react';
import { OperationalStep } from '../../types/report';
import { Cpu, ShieldCheck, ArrowDown } from 'lucide-react';

interface OperationalStepCardProps {
  op: OperationalStep;
  index: number;
  totalSteps: number;
}

export const OperationalStepCard: React.FC<OperationalStepCardProps> = ({
  op,
  index,
  totalSteps,
}) => {
  return (
    <div className="border border-slate-800 bg-[#0B101D] p-5 sm:p-6 relative corner-crosshairs hover:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-950 border border-cyan-800 text-cyan-300">
            {op.step}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
            {op.name}
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          ETAPA 0{index + 1} · METODOLOGIA
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
        {op.roleDescription}
      </p>

      {/* Action operations list */}
      <div className="mb-4">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          AÇÕES ANALÍTICAS PRINCIPAIS:
        </div>
        <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
          {op.actions.map((act, aIdx) => (
            <li key={aIdx} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">──&gt;</span>
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Checkpoint confirmation */}
      <div className="p-3 bg-[#070A10] border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-slate-500 uppercase">CRITÉRIO DE VALIDAÇÃO:</span>
        <span className="text-cyan-300 font-semibold">{op.checkpoint}</span>
      </div>

      {/* Connector arrow */}
      {index < totalSteps - 1 && (
        <div className="flex justify-center -mb-9 mt-4 relative z-10 text-cyan-400">
          <div className="p-1 bg-[#090D14] border border-slate-800">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>
      )}
    </div>
  );
};
