import React, { useState } from 'react';
import { Copy, Check, Terminal, Eye, ArrowDown } from 'lucide-react';

const CLEAN_ASCII_DIAGRAM = `[ ENTRADA DO SISTEMA: ESPECIFICAÇÃO QUALITATIVA ]
                      │
                      ▼
┌──────────────────────────────────────────────────────────┐
│  FASE 1: PARAMETRIZAÇÃO DO MUNDO (MACRO-LIMITES)         │
│  <theater> ──> <rules> ──> <limitations>                 │
│  ──> <timeline>                                          │
└──────────────────────────────────────────────────────────┘
                      │
                      ▼ (Ancoragem)
┌──────────────────────────────────────────────────────────┐
│  FASE 2: IDENTIDADE & FORMA VISUAL                       │
│  <identity> ──> <role> ──> <appearance>                  │
│             ──> <voice> ──> <mannerisms>                 │
└──────────────────────────────────────────────────────────┘
                      │
                      ▼ (Determinação Biológica, Sintética e Social)
┌──────────────────────────────────────────────────────────┐
│  FASE 3: DINÂMICA PSICODINÂMICA E CONFLITO               │
│  <backstory> ──> <motivation> ──> <beliefs>              │
│    ──> <fears> ──> <flaw> ──> <conflicts>                │
│    ──> <relationships> ──> <arc> ──> <triggers>          │
└──────────────────────────────────────────────────────────┘
                      │
                      ▼ (Livre-Arbítrio)
┌──────────────────────────────────────────────────────────┐
│  FASE 4: CAPACIDADES E RECURSOS                          │
│  <skills> ──> <abilities> ──> <props> ──> <objective>    │
└──────────────────────────────────────────────────────────┘
                      │
                      ▼ (Mobilização de Recursos)
┌──────────────────────────────────────────────────────────┐
│  FASE 5: RENDERIZAÇÃO & CONTRATO DE SAÍDA                │
│  <sensory_keys> ──> <poV> ──> <scene_sample>             │
│                 ──> <important_system_limitations>       │
│                 ──> <format_hint>                        │
└──────────────────────────────────────────────────────────┘
                      │
                      ▼
[ SAÍDA: RESULTADO ESTÁVEL, CÍCLICO E COERENTE ]`;

const VISUAL_STAGES = [
  {
    phase: 'FASE 1',
    title: 'PARAMETRIZAÇÃO DO MUNDO (MACRO-LIMITES)',
    tags: ['theater', 'rules', 'limitations', 'timeline'],
    transitionText: 'Ancoragem',
  },
  {
    phase: 'FASE 2',
    title: 'IDENTIDADE & FORMA VISUAL',
    tags: ['identity', 'role', 'appearance', 'voice', 'mannerisms'],
    transitionText: 'Determinação Biológica, Sintética e Social',
  },
  {
    phase: 'FASE 3',
    title: 'DINÂMICA PSICODINÂMICA E CONFLITO',
    tags: ['backstory', 'motivation', 'beliefs', 'fears', 'flaw', 'conflicts', 'relationships', 'arc', 'triggers'],
    transitionText: 'Livre-Arbítrio',
  },
  {
    phase: 'FASE 4',
    title: 'CAPACIDADES E RECURSOS',
    tags: ['skills', 'abilities', 'props', 'objective'],
    transitionText: 'Mobilização de Recursos',
  },
  {
    phase: 'FASE 5',
    title: 'RENDERIZAÇÃO & CONTRATO DE SAÍDA',
    tags: ['sensory_keys', 'poV', 'scene_sample', 'important_system_limitations', 'format_hint'],
    transitionText: 'Resultado Estável, Cíclico e Coerente',
  },
];

export const AsciiSchemaViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'visual' | 'ascii'>('visual');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLEAN_ASCII_DIAGRAM);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-slate-800 bg-[#070A10] p-4 sm:p-5 flex flex-col relative corner-crosshairs">
      {/* Top Bar with Mode Toggle & Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            ESQUEMA DA CASCATA VETORIAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented View Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'visual'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>VISUAL</span>
            </button>
            <button
              onClick={() => setViewMode('ascii')}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'ascii'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>ASCII PURO</span>
            </button>
          </div>

          {/* Copy ASCII Button */}
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 min-h-[28px] text-[11px] font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">COPIADO</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPIAR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode 1: High-Precision Visual Tactical Cards (No font alignment glitches) */}
      {viewMode === 'visual' && (
        <div className="space-y-3 font-mono text-xs">
          {/* Entry Box */}
          <div className="p-2.5 bg-[#0B1220] border border-cyan-800/60 text-center font-bold text-cyan-300 uppercase tracking-wider">
            [ ENTRADA DO SISTEMA: ESPECIFICAÇÃO QUALITATIVA ]
          </div>

          {/* Cascading visual cards */}
          {VISUAL_STAGES.map((st, sIdx) => (
            <div key={st.phase} className="flex flex-col items-center">
              {/* Down Arrow */}
              <div className="flex flex-col items-center my-1 text-cyan-400">
                <div className="w-[1px] h-3 bg-cyan-500/60" />
                <ArrowDown className="w-3.5 h-3.5 -mt-0.5 text-cyan-400" />
                {sIdx > 0 && (
                  <span className="text-[10px] text-cyan-300/80 font-mono mt-0.5">
                    ({VISUAL_STAGES[sIdx - 1].transitionText})
                  </span>
                )}
              </div>

              {/* Stage Box */}
              <div className="w-full border border-slate-700/80 bg-[#0B101D] p-3 relative hover:border-cyan-500/60 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-100 mb-1.5 border-b border-slate-800 pb-1">
                  <span className="text-cyan-400">{st.phase}:</span>
                  <span className="text-slate-200">{st.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300 pt-1">
                  {st.tags.map((t, idx) => (
                    <span key={t} className="inline-flex items-center gap-1">
                      <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 border border-slate-800">
                        &lt;{t}&gt;
                      </code>
                      {idx < st.tags.length - 1 && <span className="text-cyan-500 font-bold">──&gt;</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Final Exit Arrow & Box */}
          <div className="flex flex-col items-center my-1 text-cyan-400">
            <div className="w-[1px] h-3 bg-cyan-500/60" />
            <ArrowDown className="w-3.5 h-3.5 -mt-0.5 text-cyan-400" />
          </div>

          <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/60 text-center font-bold text-cyan-200 uppercase tracking-wider">
            [ SAÍDA: RESULTADO ESTÁVEL, CÍCLICO E COERENTE ]
          </div>
        </div>
      )}

      {/* Mode 2: Clean ASCII Protocol Monospace View (Strictly aligned, zero stray pipes) */}
      {viewMode === 'ascii' && (
        <div className="bg-[#05080E] border border-slate-900 p-3 sm:p-4 overflow-x-auto">
          <pre className="text-cyan-300 leading-tight text-[11px] font-mono selection:bg-cyan-500/40">
            {CLEAN_ASCII_DIAGRAM}
          </pre>
        </div>
      )}
    </div>
  );
};
