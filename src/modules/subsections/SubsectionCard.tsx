import React from 'react';
import { SubsectionItem } from '../../types/report';
import { Copy, Check, ChevronDown, ChevronUp, Terminal, Cpu, ShieldAlert, BookOpen } from 'lucide-react';

interface SubsectionCardProps {
  item: SubsectionItem;
  isExpanded: boolean;
  copiedId: number | null;
  onToggleExpand: (id: number) => void;
  onCopy: (id: number, snippet: string) => void;
}

export const SubsectionCard: React.FC<SubsectionCardProps> = ({
  item,
  isExpanded,
  copiedId,
  onToggleExpand,
  onCopy,
}) => {
  return (
    <article
      id={`sub-${item.id}`}
      className="border border-slate-800 bg-[#0B101D]/70 transition-all hover:border-slate-700 relative corner-crosshairs"
    >
      {/* Micro Light-line header accent */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/80 via-cyan-400/20 to-transparent" />

      <div className="p-4 sm:p-6">
        {/* Title & Metadata Zone */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-slate-900 border border-cyan-900/60 text-cyan-400 font-mono text-xs font-bold tabular-nums">
              {item.id < 10 ? `0${item.id}` : item.id}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
                {item.id}. {item.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-300 font-semibold">&lt;{item.tag}&gt;</span>
                <span aria-hidden="true">·</span>
                <span>{item.phaseName}</span>
                <span aria-hidden="true">·</span>
                <span>Injeção: #{item.injectionOrder}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onCopy(item.id, item.exampleSnippet)}
              className="px-2.5 py-1 text-[11px] font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedId === item.id ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIADO</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>COPIAR TAG</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleExpand(item.id)}
              className="px-2 py-1 text-[11px] font-mono border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <span>RECOLHER</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>EXPANDIR</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mathematical Vector Transition Block */}
        <div className="bg-[#080C14] border border-slate-800/90 p-3 sm:p-4 mb-4 font-mono text-xs text-slate-200">
          <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            PROGRESSÃO ANALÍTICA (──&gt;)
          </div>
          <div className="text-cyan-300 font-bold overflow-x-auto py-1">
            {item.equation}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
            <span className="text-slate-500 font-semibold uppercase">RELAÇÃO DE ENCADEAMENTO (──&gt;):</span>
            <span className="text-slate-300">{item.flowRole}</span>
          </div>
        </div>

        {/* Prose Content (Expository-Dissertative) */}
        {isExpanded && (
          <div className="space-y-4 pt-2">
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed border-l-2 border-slate-800 pl-4">
              {item.paragraphs.map((p, idx) => (
                <p key={idx} className="text-justify sm:text-left">
                  {p}
                </p>
              ))}
            </div>

            {/* Operational Invariant and Systemic Constraint */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              <div className="p-3 bg-slate-950/60 border border-slate-800/80">
                <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  FUNÇÃO ANALÍTICA NA NARRATIVA
                </div>
                <p className="text-xs text-slate-300">
                  {item.operationalRole}
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 border border-amber-950/30 border-l-amber-500 border-l-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  SALVAGUARDA DE CONSISTÊNCIA
                </div>
                <p className="text-xs text-slate-300">
                  {item.systemicConstraint}
                </p>
              </div>
            </div>

            {/* Code / XML Snippet Example */}
            <div className="mt-3 bg-[#06090F] border border-slate-800/90 p-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5 pb-1 border-b border-slate-800/60">
                <span className="flex items-center gap-1 text-slate-400">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  EXEMPLO PRÁTICO DE APLICAÇÃO
                </span>
                <span className="text-slate-500">ESTRUTURA DE DADOS</span>
              </div>
              <pre className="text-cyan-200/90 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {item.exampleSnippet}
              </pre>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
