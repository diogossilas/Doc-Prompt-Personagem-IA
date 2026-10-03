import React from 'react';
import { Shield } from 'lucide-react';

export const TacticalFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080E] py-8 pb-24 md:pb-8 px-4 lg:px-8 text-xs font-mono text-slate-500">
      <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-semibold text-slate-200">Doc. Eng-Prompt LLMs e Agentes IA</span>
          <span aria-hidden="true">·</span>
          <span>ANÁLISE ESTRUTURADA 29-COT (──&gt;)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span>MODELAGEM ANALÍTICO-DISSERTATIVA</span>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            TOPO ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
