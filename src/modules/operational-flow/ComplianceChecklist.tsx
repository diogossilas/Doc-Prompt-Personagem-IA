import React, { useState } from 'react';
import { Activity, CheckSquare, Square } from 'lucide-react';

interface ComplianceChecklistProps {
  playBlip: () => void;
  playConfirmed: () => void;
}

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({
  playBlip,
  playConfirmed,
}) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    step0_order: true,
    step1_coherence: true,
    step1_cyclic: true,
    step2_lexicon: true,
    step2_anti_ai: true,
    step3_format: true,
  });

  const checklistItems = [
    { key: 'step0_order', label: 'Injeção Sequencial das 29 Seções (Sem omissão de nenhuma tag fundamental)' },
    { key: 'step1_coherence', label: 'Eliminação de Contradições e Anacronismos (Compilação de Roteiro)' },
    { key: 'step1_cyclic', label: 'Cadência Cíclica Travada (Convergência teleológica de início ao fim)' },
    { key: 'step2_lexicon', label: 'Densidade Léxica Calibrada (Vocabulário restrito estritamente a <skills>)' },
    { key: 'step2_anti_ai', label: 'Blindagem Anti-Slop / Anti-IA (Banimento terminativo de "Como um modelo de IA...")' },
    { key: 'step3_format', label: 'Topologia Visual Sincronizada (Contrato gráfico fiel ao <format_hint>)' },
  ];

  const toggleCheck = (key: string) => {
    playBlip();
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const allDone = Object.values(next).every(Boolean);
      if (allDone) {
        playConfirmed();
      }
      return next;
    });
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="border border-slate-800 bg-[#090E18] p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            CRITÉRIOS EDITORIAIS DE CONSISTÊNCIA (VALIDAÇÃO EM 6 PONTOS)
          </span>
        </div>
        <div className="text-xs font-mono text-cyan-400">
          STATUS: {completedCount} / {checklistItems.length} VALIDADOS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {checklistItems.map((item) => {
          const isChecked = checklist[item.key];
          return (
            <button
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`p-3 text-left border flex items-start gap-3 transition-colors cursor-pointer min-h-[44px] ${
                isChecked
                  ? 'border-cyan-900/60 bg-cyan-950/20 text-slate-200'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400'
              }`}
            >
              {isChecked ? (
                <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              )}
              <span className="text-xs font-mono leading-relaxed">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-mono leading-relaxed border-t border-slate-800/80 pt-3">
        A aplicação criteriosa destas etapas assegura que o texto gerado supere respostas genéricas, consolidando uma <strong className="text-cyan-300">caracterização sólida, humana e envolvente</strong>. Cada resposta passa a refletir de forma equilibrada as 29 facetas essenciais de identidade, psicologia e contexto.
      </p>
    </div>
  );
};
