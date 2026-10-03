import React from 'react';

export const OperatorLegend: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="border border-slate-800 bg-[#0B101D] p-4 relative corner-crosshairs">
        <div className="flex items-center gap-2 mb-2 font-mono text-cyan-400 text-sm font-bold">
          <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-300">
            ──&gt;
          </span>
          <span>ENCADEAMENTO CAUSAL DIRETO</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Uma premissa conduz diretamente à etapa seguinte. O contexto estabelecido orienta as decisões futuras, garantindo uma narrativa contínua sem quebras lógicas. Exemplo: <code className="text-cyan-300 font-mono">&lt;backstory&gt; ──&gt; &lt;motivation&gt;</code> demonstra como acontecimentos anteriores moldam os propósitos atuais da persona.
        </p>
      </div>

      <div className="border border-slate-800 bg-[#0B101D] p-4 relative corner-crosshairs">
        <div className="flex items-center gap-2 mb-2 font-mono text-amber-400 text-sm font-bold">
          <span className="px-2 py-0.5 bg-amber-950 border border-amber-800 text-amber-300">
            ──&gt; [Filtro]
          </span>
          <span>SALVAGUARDA E CONSISTÊNCIA</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Mecanismo analítico de verificação que impede contradições e exageros. O sistema descarta respostas incoerentes com as capacidades reais da persona. Exemplo: <code className="text-amber-300 font-mono">&lt;limitations&gt; ──&gt; [Filtro de Limites]</code> assegura que o agente reconheça seus limites sem recorrer a soluções irreais.
        </p>
      </div>

      <div className="border border-slate-800 bg-[#0B101D] p-4 relative corner-crosshairs">
        <div className="flex items-center gap-2 mb-2 font-mono text-blue-400 text-sm font-bold">
          <span className="px-2 py-0.5 bg-blue-950 border border-blue-800 text-blue-300">
            ──
          </span>
          <span>ASSOCIAÇÃO MÚTUA E COERÊNCIA</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Conexão equilibrada entre dois elementos que operam em sintonia permanente. Exemplo: <code className="text-blue-300 font-mono">&lt;theater&gt; ── &lt;props&gt;</code> assegura que ferramentas e vestimentas reflitam as mesmas condições materiais e o desgaste do ambiente em que o indivíduo atua.
        </p>
      </div>
    </div>
  );
};
