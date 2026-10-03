import React from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

interface VectorFormEditorProps {
  formData: Record<string, string>;
  onInputChange: (field: string, val: string) => void;
  onReset: () => void;
}

export const VectorFormEditor: React.FC<VectorFormEditorProps> = ({
  formData,
  onInputChange,
  onReset,
}) => {
  return (
    <div className="border border-slate-800 bg-[#0B101D]/80 p-4 space-y-3">
      <div className="border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-300 font-semibold uppercase flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          Variáveis Analíticas Fundamentais
        </span>
        <button
          onClick={onReset}
          title="Restaurar valores do preset"
          className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer min-h-[28px]"
        >
          <RefreshCw className="w-3 h-3" />
          RESTAURAR
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          1. IDENTITY (Nome e Identificação Civil):
        </label>
        <input
          type="text"
          value={formData.identity || ''}
          onChange={(e) => onInputChange('identity', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          2. ROLE (Papel e Função na História):
        </label>
        <input
          type="text"
          value={formData.role || ''}
          onChange={(e) => onInputChange('role', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          4. THEATER (Ambiente e Contexto Geográfico):
        </label>
        <textarea
          rows={2}
          value={formData.theater || ''}
          onChange={(e) => onInputChange('theater', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          5. OBJECTIVE (Meta e Resultado Pretendido):
        </label>
        <input
          type="text"
          value={formData.objective || ''}
          onChange={(e) => onInputChange('objective', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          7. FLAW (Vulnerabilidade e Falha de Julgamento):
        </label>
        <textarea
          rows={2}
          value={formData.flaw || ''}
          onChange={(e) => onInputChange('flaw', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          11. VOICE (Tom, Ritmo e Vocabulário):
        </label>
        <input
          type="text"
          value={formData.voice || ''}
          onChange={(e) => onInputChange('voice', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-400 mb-1">
          19. TRIGGERS (Gatilhos e Reações Sob Tensão):
        </label>
        <input
          type="text"
          value={formData.triggers || ''}
          onChange={(e) => onInputChange('triggers', e.target.value)}
          className="w-full bg-[#080C14] border border-slate-800 text-xs font-mono text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 min-h-[36px]"
        />
      </div>
    </div>
  );
};
